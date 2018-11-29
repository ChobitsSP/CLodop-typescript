declare module "CLodop" {
  /**
   * http://www.c-lodop.com/LodopDemo.html
   * @export
   * @interface CLodop
   */
  interface CLodop {
    /**
     * 直接打印
     * @memberof CLodop
     */
    PRINT();
    PREVIEW();
    PRINT_DESIGN();

    SET_PRINTER_INDEX(str: string);

    SET_LICENSES(company: string, key1: string, key2: string, key3: string);

    /**
     * 增加超文本项
     * @param {number} intTop
     * @param {number} intLeft
     * @param {number | string} intWidth
     * @param {number | string} intHeight
     * @param {string} strHtml
     * @memberof CLodop
     */
    ADD_PRINT_HTM(
      intTop: number,
      intLeft: number,
      intWidth: number | string,
      intHeight: number | string,
      strHtml: string
    );

    /**
     * 设定纸张大小
     * LODOP.SET_PRINT_PAGESIZE(1, "10mm", "10mm", "A4");  //自定义纸张大小打印
     * @param {number} intOrient 3---纵向打印，宽度固定，高度按打印内容的高度自适应
     * @param {number | string} intPageWidth 纸张宽，单位为0.1mm 譬如该参数值为45，则表示4.5mm,计量精度是0.1mm。
     * @param {number | string} intPageHeight 固定纸张时该参数是纸张高；高度自适应时该参数是纸张底边的空白高，计量单位与纸张宽一样。
     * @param {string} strPageName 纸张类型名， intPageWidth等于零时本参数才有效，具体名称参见操作系统打印服务属性中的格式定义。
     *  关键字“CreateCustomPage”会在系统内建立一个名称为“LodopCustomPage”自定义纸张类型。
     * @memberof CLodop
     */
    SET_PRINT_PAGESIZE(
      intOrient: 0 | 1 | 2 | 3,
      intPageWidth: number | string,
      intPageHeight: number | string,
      strPageName: string
    );

    /**
     * 二维码打印
     * LODOP.ADD_PRINT_BARCODE(165, 70, 150, 150, "QRCode", 'url')
     * @param {number} intTop
     * @param {number} intLeft
     * @param {(number | string)} intWidth
     * @param {(number | string)} intHeight
     * @param {("QRCode" | "PDF417")} codeType
     * @param {string} codeValue
     * @memberof CLodop
     */
    ADD_PRINT_BARCODE(
      intTop: number,
      intLeft: number,
      intWidth: number | string,
      intHeight: number | string,
      codeType: "QRCode" | "PDF417",
      codeValue: string
    );
  }

  enum Orient {
    方向不定 = 0,
    纵向打印 = 1,
    横向打印 = 2,
    /**
     * 纵向打印，宽度固定，高度按打印内容的高度自适应
     */
    纵向打印2 = 3
  }
}
