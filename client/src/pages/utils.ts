const signatures: { [key: string]: string; } = {
  JVBERi0: "application/pdf",
  UEsDBBQ: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", //docx
  iVBORw0KGgo: "image/png",
};

export const detectMimeType = (b64: string) => {
  for (let s in signatures) {
    if (b64?.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}