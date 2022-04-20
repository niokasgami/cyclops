export default class Utils {
  /**
   * @deprecated use Window.openDevTools instead
   */
  public static openDevTools() {
    // eslint-disable-next-line global-require
    require('nw.gui').Window.get().showDevTools();
  }
}
