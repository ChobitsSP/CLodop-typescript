import $script from "scriptjs";
import { CLodop } from "CLodop";

let LODOP: CLodop = null;
const IsHttps = window.location.protocol === "https:";

function getLodop() {
  return new Promise<CLodop>(async (resolve, reject) => {
    if (LODOP != null) {
      const oEMBED: HTMLElement = window["oEMBED"];
      const oOBJECT: HTMLElement = window["oOBJECT"];
      //清理原例子内的object或embed元素，避免乱提示：
      if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
      if (oOBJECT && oOBJECT.parentNode)
        oOBJECT.parentNode.removeChild(oOBJECT);

      resolve(LODOP);
      return;
    }

    window["On_CLodop_Opened"] = function() {
      delete window["On_CLodop_Opened"];

      try {
        LODOP = IsHttps ? window["LODOP"] : window["getCLodop"]();

        if (LODOP == null) {
          alert("C-Lodop没准备好，请稍后再试！");
          reject("C-Lodop没准备好，请稍后再试！");
          return;
        }

        LODOP.SET_LICENSES(
          "",
          "123123123123",
          "123123123123",
          ""
        );
        resolve(LODOP);
      } catch (err) {
        alert("getLodop出错:" + err);
        reject(err);
      }
    };
    await InitJs();
  });
}

function LoadScript(url: string) {
  return new Promise(resolve => $script(url, resolve));
}

async function InitJs() {
  if (IsHttps) {
    await LoadScript("https://localhost:8443/CLodopfuncs.js");
  } else {
    await LoadScript("http://localhost:8000/CLodopfuncs.js?priority=2");
    await LoadScript("http://localhost:18000/CLodopfuncs.js?priority=1");
  }
}

function GetLinks() {
  const arr: string[] = [];
  const links = document.querySelectorAll("link");
  const len = links.length;

  for (let i = 0; i < len; i++) {
    arr.push(`<link href="${links[i].href}" rel="stylesheet">`);
  }

  const list2 = document.querySelectorAll("style");

  for (let i = 0; i < list2.length; i++) {
    arr.push(list2[i].outerHTML);
  }

  return arr.join("\r\n");
}

/**
 * PrintDoc1
 * @export
 * @param {string} html 传入的body字符串
 */
async function PrintDoc(html: string) {
  const LODOP = await getLodop();
  LODOP.SET_PRINTER_INDEX("shuitian");

  const strFormHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  ${GetLinks()}
</head>
<body>
  ${html}
</body>
</html>`;

  LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", strFormHtml);
  // LODOP.ADD_PRINT_BARCODE(165, 70, 150, 150, "QRCode", 'url');
  LODOP.SET_PRINT_PAGESIZE(3, 800, 10, "");
  LODOP.PRINT();
  // LODOP.PREVIEW()
  // LODOP.PRINT_DESIGN();
}
