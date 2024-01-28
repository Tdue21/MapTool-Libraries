[h: logger = dsnb.getRecord(log.getLoggers(), "name", "macro-logger")]
[r: json.get(logger, "level") == "DEBUG"]
