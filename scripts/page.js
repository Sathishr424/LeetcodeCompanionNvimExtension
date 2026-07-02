async function waitForEditor(timeout = 10000) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    // Monaco
    if (
      typeof monaco !== "undefined" &&
      monaco.editor &&
      monaco.editor.getModels().length > 0
    ) {
      return "monaco";
    }

    // CodeMirror
    const cm = document.querySelector(".cm-content");
    if (cm?.cmView?.view?.state?.doc) {
      return "codemirror";
    }

    await new Promise((r) => setTimeout(r, 100));
  }

  throw new Error("Timed out waiting for editor");
}

(async () => {
  const editorType = await waitForEditor();

  let code;

  if (editorType === "monaco") {
    code = monaco.editor.getModels()[0].getValue();
  } else {
    code = document.querySelector(".cm-content").cmView.view.state.doc.toString();
  }

  const name = document.querySelector(".text-title-large")?.textContent?.trim();

  window.postMessage({
    source: "leetcode-extension",
    code,
    name,
  });
})();
