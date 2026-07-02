async function waitForMonaco(timeout = 10000) {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    if (
      window.monaco &&
      monaco.editor &&
      monaco.editor.getModels().length
    ) {
      return;
    }

    await new Promise(r => setTimeout(r, 100));
  }

  throw new Error("Timed out");
}

(async () => {
  await waitForMonaco();

  const code = monaco.editor.getModels()[0].getValue();
  const name = document.querySelector('.text-title-large').textContent;

  window.postMessage({
    source: "leetcode-extension",
    code,
    name
  });
})();
