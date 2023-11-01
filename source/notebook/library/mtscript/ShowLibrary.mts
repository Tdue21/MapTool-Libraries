[h: data = json.set("{}", "playerName", getPlayerName(), "isGM", isGM())]

[h: playerName = getPlayerName()]
[h: ]


function showLibrary() {
    try {
        const _playerName = MT.getPlayerName();
        const json = MT.getLibProperty("notebooks", ns);
        console.log(json);
        const _notebooks = JSON.parse(json);
        const _userPrefs = getUserPreferences(_playerName);
        const data = {
            "isGM": MT.isGM(),
            "playerName": _playerName,
            "asFrame": _userPrefs.asFrame,
            "notebooks": _notebooks
        };

        let options = getDialogOptions(260, 500, transEncode(data));
        MT.showFrame("Notebook Library", `lib://${ns}/client/library.html`, options);
    } catch (error) {
        MT.printException("showLibrary", error);
    }
}