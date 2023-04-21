import { createRef, useCallback, useEffect, useMemo } from 'react';
import MediumEditor from 'medium-editor';
import { useSelector } from 'react-redux';

import Predictable from 'modules/text-editor/predictable/predictable';
import { generateRandomId } from 'modules/text-editor/predictable/utils';

import { useTheme } from '@mui/material';
import fetchReviewTextUpdate from './fetchReviewTextUpdate';

type TTextEditorProps = {
  keywords: Array<String>
}

const TextEditor = (props: TTextEditorProps) => {
  const { keywords } = props;
  const editorContainer = createRef<HTMLDivElement>();
  const theme = useTheme();
  const token = useSelector((state: any) => state.token);
  const currentReview = useSelector((state: any) => state.currentReview);

  const predictableContainerId = useMemo(() => `${generateRandomId()}-${generateRandomId()}`, []);
  const editorId = useMemo(() => `${generateRandomId()}-${generateRandomId()}`, []);

  const preventTabDefault = (ev: KeyboardEvent) => {
    if (ev.key && ev.key === 'Tab') {
      ev.preventDefault();
    }  
  };

  const isCaretAtEnd = (element: HTMLElement) => {
    let caretEndPosition = false,
        selectionRange,
        temporaryRange;

    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount) {
        selectionRange = selection.getRangeAt(0);
        temporaryRange = selectionRange.cloneRange();
        
        temporaryRange.selectNodeContents(element);
        temporaryRange.setEnd(selectionRange.startContainer, selectionRange.startOffset);
        temporaryRange.selectNodeContents(element);
        temporaryRange.setStart(selectionRange.endContainer, selectionRange.endOffset);
        caretEndPosition = (temporaryRange.toString() === '');
      }
    }

    return caretEndPosition;
  };

  const getLastWord = () => {
    const selectedElement = window.getSelection()?.anchorNode;
    //@ts-ignore
    if (selectedElement && selectedElement.data) return selectedElement.data;
  };

  const getLastWordOffset = useCallback((text: string) => {
    if (text) {
      const words = text.split(' ');
      const range = getLastWord();
      const lastWordOfRange = words[ words.length - 1 ].trim();
      return range.length - lastWordOfRange.length;
    }
    return 0;
  }, []);

  const getLastWordCoordinates = useCallback(() => {
    const selection = window.getSelection(),
        anchorNode = selection?.anchorNode,
        previousRange = selection?.getRangeAt(0),
        lastWordOffset = getLastWordOffset(getLastWord()),
        range = document.createRange();

    if (anchorNode && previousRange) {
      range.setStart(anchorNode, lastWordOffset);
      range.setEnd(anchorNode, lastWordOffset);
      range.collapse(false);
  
      const shadowNode = document.createElement('span');
      shadowNode.id = generateRandomId();
      shadowNode.appendChild(document.createTextNode(''));
      range.insertNode(shadowNode);
      selection.removeAllRanges();
      selection.addRange(previousRange);
  
      const { top, left } = shadowNode.getBoundingClientRect(),
          parentNode = shadowNode.parentElement;
  
      if (parentNode) {
        parentNode.normalize();
        parentNode.removeChild(shadowNode);
      }
      return { top, left };
    }
    return { top: null, left: null };
  }, [getLastWordOffset]);

  const placeCaretAtEnd = (editor: any) => {
    if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);

      const selection = window.getSelection();

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const insertTextAtCursor = useCallback((editor: any, text: string) => {
    let selection,
        range;

    if (window.getSelection && editor) {
      selection = window.getSelection();
      if (selection && selection.getRangeAt && selection.rangeCount) {
        range = selection.getRangeAt(0);
        range.deleteContents();
        //@ts-ignore
        if (range.commonAncestorContainer.className.includes('medium')) {
          range.insertNode(document.createTextNode(text));
        }
      }
    }
    placeCaretAtEnd(editor);
  }, []);

  useEffect(() => {
    const rerenderPredictableText = () => {
      const predictableContainer = document.getElementById(predictableContainerId);
      const { top, left } = getLastWordCoordinates();
    
      if (predictableContainer) {
        predictableContainer.style.top = `${top}px`;
        predictableContainer.style.left = `${left}px`;
        predictableContainer.style.display = 'inline';
      }
    };

    const clickOutside = async (ev: any) => {
      if (editorContainer.current && !editorContainer.current.contains(ev.target)) {
        await fetchReviewTextUpdate(currentReview.review, token, editorContainer.current.textContent);
        const predictableContainer = document.getElementById(predictableContainerId);
        if (predictableContainer) {
          predictableContainer.style.display = 'none';
        }
      }
    };

    new MediumEditor(
      editorContainer.current!,
      {
        placeholder: {
          text: 'Начните печатать...',
        },
        toolbar: false,
        autoLink: false,
        imageDragging: false,
        disableExtraSpaces: true,
      }
    );

    const editor = document.getElementById(editorId);
    if (editor) {
      editor.addEventListener('keydown', preventTabDefault);
      editor.addEventListener('keyup', e => {
        const predictableContainer = document.getElementById(predictableContainerId);

        if (predictableContainer) predictableContainer.style.display = 'none';

        if (predictableContainer &&
            predictableContainer.firstChild &&
            //@ts-ignore
            predictableContainer.firstChild.firstChild?.data !== '' &&
            e.key &&
            e.key !== 'Backspace' &&
            e.key !== 'Enter' &&
            // Only check for suggested phrases if the user is typing at the end of the document.
            isCaretAtEnd(editor)
        ) {
            const incompleteText = document.getSelection()?.anchorNode;

            if (incompleteText) {
              const { top, left } = getLastWordCoordinates();
              // We create the visual effect of a placeholder element by overlaying the
              // suggestion container at the exact position of the incomplete text.
              predictableContainer.style.top = `${top}px`;
              predictableContainer.style.left = `${left}px`;
              predictableContainer.style.display = 'inline';
            }
        }
      });
      editor.style.cssText = `
        width: 70%;
        height: 570px;
        color: ${theme.palette.neutral.main};
        background-color: ${theme.palette.background.default};
        overflow: scroll;
        border-top: none;
        padding: 40px !important;
        border: 1px solid #80808082;
        border-radius: 4px;
        position: relative;
        font-family: Arial, serif!important;
        font-size: 16.63px!important;
        letter-spacing: 0!important;
        line-height: 2rem;
        outline: none;
      `;

      new Predictable({
        predictableContainerId,
        editorId,
        data: { source: keywords },
        editor: editor,
        sensitivity: 3,
        predictableContainer: {
          container: (source: any) => {
            source.setAttribute('id', predictableContainerId);
            source.style.cssText = `
              display: none;
              font-family: Arial, serif!important;
              font-size: 16.63px !important;
              letter-spacing: 0 !important;
              -webkit-user-modify: read-only;
              user-select: none;
              cursor: text;
              position: fixed;
              text-overflow: ellipsis;
              white-space: wrap;
              max-width: 320px;
              overflow: hidden;
              z-index: 99999;
              color: #757575;
              opacity: 0.7;
              line-height: 1.2rem;
            `;
          }
        },
        suggestionText: {
          content: ({ match }: any, source: any) => {
            source.textContent = match;
          }
        },
        context: {
          getData: () => {
            getLastWordCoordinates();
            return getLastWord();
          }
        },
        onTabPress: () => {
          const incompleteText = document.getSelection()?.anchorNode,
              range = document.createRange();

          if (incompleteText) {
            range.selectNodeContents(incompleteText);
  
            let _incompleteText = incompleteText;
  
            if (incompleteText.nodeType === 3) {
              //@ts-ignore
              _incompleteText = incompleteText.data;
            } else {
              //@ts-ignore
              _incompleteText = incompleteText.textContent;
            }
            //@ts-ignore
            let autocompleteText = document.querySelector('.predictable__suggestion').firstChild.data;
            autocompleteText = autocompleteText.replace(_incompleteText, '');
  
            insertTextAtCursor(editorContainer.current, autocompleteText);
          }
        }
      });

   

      editor.addEventListener('scroll', rerenderPredictableText);
    };


    document.addEventListener('scroll', rerenderPredictableText);
    document.addEventListener('click', clickOutside);

    return () => {
      document.removeEventListener('keydown', preventTabDefault);
      document.removeEventListener('scroll', rerenderPredictableText);
      document.removeEventListener('click', clickOutside);

      const predictableContainer = document.getElementById(predictableContainerId);
      if (predictableContainer) {
        predictableContainer.style.display = 'none';
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, editorId, editorContainer, predictableContainerId, getLastWordCoordinates, insertTextAtCursor]);

  useEffect(() => {
    if (editorContainer.current && currentReview && currentReview.review.text) {
      insertTextAtCursor(editorContainer.current, currentReview.review.text);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id={editorId} ref={editorContainer} />
  )
};

export default TextEditor;