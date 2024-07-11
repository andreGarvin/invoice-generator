export function downloadBlob(invoiceNumber, blob) {
  const fileName = `invoice-${invoiceNumber}.pdf`;
  console.info("file-name: %s", fileName);

  const url = URL.createObjectURL(blob);
  console.info("blob-url: %s", url);

  const downloadUrl = ["text/pdf", fileName, url].join(":");

  const anchor = document.createElement("a");

  anchor.dataset.downloadurl = downloadUrl;
  anchor.download = fileName;
  anchor.href = url;

  anchor.click();

  URL.revokeObjectURL(url);
}

export const getDataURL = (file): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("no file given"));

    const reader = new FileReader();

    reader.onload = function (e) {
      return resolve(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  });

};
