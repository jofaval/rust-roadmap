// COPY AND PASTE THIS IN THE CONSOLE WHILE ON RUST'S BOOK PAGE
// url: https://doc.rust-lang.org/stable/book

(() => {
  // usage constants
  const QUERY_CHAPTER_INDECES = "ol.chapter a";
  const NUM_PROLOGUE_CHAPTERS = 3;
  const JUMPLINE = "\n";
  const CONSOLE_LOG_STYLE = `
    font-weight: 1000;
    text-transform: uppercase;
    font-size: 12px;
    font-family: Arial;
  `.replaceAll("\n", " ");
  const DIRECTORY_SEPARATOR = "/";
  // const SUB_INDEX_REGEX = /(\.(?!\s))+/;
  const SUB_INDEX = ".";

  // control flow constants
  const RETURN_COMMAND = false;
  const PRINT_COMMAND = true;
  const DEBUG = true;

  const logDebug = (...content) => {
    if (!DEBUG) {
      return;
    }

    return console.log(...content);
  };
  const logDebugStyled = (header, variable) => {
    logDebug(`%c${header}`, CONSOLE_LOG_STYLE, variable);
  };

  const getChapters = () =>
    [...temp0.querySelectorAll(QUERY_CHAPTER_INDECES)].slice(
      NUM_PROLOGUE_CHAPTERS
    );
  const chapters = getChapters();
  logDebugStyled("chapters", chapters);

  /**
   * @param {string} anchor
   * @returns {string}
   */
  const mapChapterContent = (anchor) => anchor.innerText;
  const chapterTexts = chapters.map(mapChapterContent);
  logDebugStyled("chapter texts", chapterTexts);

  const sortedChapterCommands = chapterTexts.sort();
  logDebugStyled("sorted chapter commands", sortedChapterCommands);

  /**
   * @param {string} rawName
   * @returns {string}
   */
  const sanitizeFolderName = (rawName) => {
    let sanitizedName = rawName;
    sanitizedName = sanitizedName.replaceAll("/", "-");
    sanitizedName = sanitizedName.replaceAll("?", "");

    return sanitizedName;
  };

  const chaptersMap = new Map();
  /**
   * @param {string} fullName
   * @returns {string}
   */
  const mapChapterFolder = (fullName) => {
    let safeFullName = sanitizeFolderName(fullName);
    const [index, ...incompleteName] = fullName.split(SUB_INDEX);
    const name = incompleteName.join(SUB_INDEX);

    let useableName;
    if (name.startsWith(" ")) {
      chaptersMap.set(index, safeFullName);
      useableName = safeFullName;
    } else {
      useableName = [chaptersMap.get(index), safeFullName].join(
        DIRECTORY_SEPARATOR
      );
    }

    return `mkdir "${useableName}"`;
  };
  const rawChapterCommands = sortedChapterCommands.map(mapChapterFolder);
  logDebugStyled("chapter map", chaptersMap);
  logDebugStyled("raw chapter commands", rawChapterCommands);

  const chaptersGenerationCommand = [
    "",
    rawChapterCommands.join(JUMPLINE),
    "", // actual end of line
    "",
  ].join(JUMPLINE);
  logDebugStyled("chapter generation commands", chaptersGenerationCommand);

  if (PRINT_COMMAND) {
    console.log(chaptersGenerationCommand);
  }

  if (RETURN_COMMAND) {
    return chaptersGenerationCommand;
  }
})();
