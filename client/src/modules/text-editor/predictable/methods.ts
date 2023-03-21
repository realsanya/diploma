//TODO: add types for props
import { generateRandomId } from './utils';

const dataAttribute = 'data-result';
const select = {
  predictableContainer: `${generateRandomId() }-${ generateRandomId()}`,
  result: `${generateRandomId()}-${generateRandomId()}`
};

const getContent = (selector: any) => selector;

const createResultsList = (renderResults: any) => {
  const { container, position, element, destination } = renderResults;
  const resultsList = document.createElement(element);
  resultsList.setAttribute('id', select.predictableContainer);

  if (container) {
    container(resultsList);
  }

  destination.insertAdjacentElement(position, resultsList);
  return resultsList;
};

const insertSuggestion = (resultsList: any, dataSrc: any, resultItem: any) => {
  if (dataSrc.length > 0) {
    const result = document.createElement(resultItem.element);
    const resultValue = dataSrc[0].value;
    result.setAttribute(dataAttribute, resultValue);
    result.setAttribute('id', select.result);
    result.setAttribute('class', 'predictable__suggestion');
    result.setAttribute('style', 'white-space: nowrap');
    resultItem.content ? resultItem.content(dataSrc[0], result)
      : (result.innerHTML = dataSrc[0].match || dataSrc[0]);
    resultsList.appendChild(result);
  }
};

const clearResults = (resultsList: any) => ( resultsList.innerHTML = '');

const getSelection = (predictableContainerId: any, editor: any, resultsList: any, callback: any, resultsValues: any) => {
  const results: HTMLElement | null = document.getElementById(select.result);
  const predictableContainer: HTMLElement | null = document.getElementById( predictableContainerId );

  if (results && predictableContainer) {

    const tabListener = (ev: KeyboardEvent) => {
      if (ev.key === 'Tab' &&
        predictableContainer.firstChild &&
          //@ts-ignore
          predictableContainer.firstChild.firstChild?.data !== ''
        ) {
            callback( {
              event: ev,
              context: editor.innerHTML,
              matches: resultsValues.matches,
              results: resultsValues.list.map((record: any) => record.value ),
              selection: resultsValues.list.find((value: any) => {
              const resValue = value.value;
                return resValue === results.getAttribute(dataAttribute);
              }),
            });
    
            clearResults(resultsList);
            document.removeEventListener('keyup', tabListener);
      }
    }

    document.addEventListener('keydown', tabListener);
  }
};

export const predictableMethods = {
  getInput: getContent,
  createResultsList,
  insertSuggestion,
  clearResults,
  getSelection,
};