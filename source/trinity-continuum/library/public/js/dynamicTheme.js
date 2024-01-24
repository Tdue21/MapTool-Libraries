async function loadThemeStyle() {
    let theme = MapTool.mocked ? "aeon" : (await evaluateMacro("[r:tcc.getTheme()]"));
    let styles = document.createElement('link');

    styles.rel = 'stylesheet';
    styles.type = 'text/css';
    styles.media = 'screen';
    styles.href = `./css/${theme}.css?cachelib=false`;

    document.getElementsByTagName('head')[0].appendChild(styles);
}

loadThemeStyle();