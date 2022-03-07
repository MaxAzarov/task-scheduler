import moment from "moment";
import { Readable } from "stream";
import { getMicrosoftEvents } from "../../microsoft/lib/apiFunctions";

import getArrayFromStream from "../../utils/getArrayFromStream";
import { DATE_FORMAT } from "../../constants/services";

describe.skip("microsoft getCalendarsList", () => {
  it("should work properly", async () => {
    const token =
      "EwCIA8l6BAAUwihrrCrmQ4wuIJX5mbj7rQla6TUAAdSots7XGoKiJBXMpZThuAs9cxRolf7fXw7h6lX3hcMWw0YNWkIRR6D3yXqe0ghCF0ANgzJCEDlA9sGTc8O9MAtnLQtGPiEb6tQlLx1ooTgFn2sYgTvdhdqjf7HATROWF/cwNEX2KyqNQ6ep/q5aSyB1BAau+aLKm9DtafVTk0JU9BUUzUu90gOdaXVGedvI9LnAIxAUagakAXxZ1M4ufQTJDL9mWxf6PNOFMHE1GKXwjEWuG+aTj/kcfPewicE6EcQnUWRe6ORxXhVsiHxKMmIHZh+/0d62iTExYidp6dUFdoPWyX+zQNfbhRBXw4FR5lEARdQWeDdU1HrdMRX1nkoDZgAACIqt/4jgPRrQWAKEvah2tiQRr8w/J0gBEUmJGFwWuNQ4ZhY0wv+7lNmFW6xx8eb356N41ZE4oOLkmAkQSNp1+gsu5sdZM+oLFw31JoGLScHlYT2gg8nP1A1bEO9kt7TeeTAylsMewl03UCLqsuV+yCVLTeqvT5F0JXEPQFsZbHno5aHGEXXwO5Xcql5ZIL+mmHeKnL5gwPlU3zB2Caj+k+QU+wmJ0pXjlXzEPnpzb8eXJ0wLOBfBEngX9dqdrfevPgdUJI235TG4NNZXpnIF9fPneuX3FeCyBMMtVhnjPTWCyAxXLfoUWWSbr5y4x/RLeApf6YcPvuzEFDMehmbAT9nTN2gur65uVRsgQpKREhOF7ac3SKCUy5NigtgPRtg07X+8mQisR99DnUb1zq59qOyz+ahbeAxXJnsQP/p5jdgbsq+6KH2Kq0e782PNl2SQULiB5X1tjQdajfEBiU9q9W3ylfr/7c6rD2ZI5/mNUQ4qR0RQWOoz5nGsXouTeloRMmzzWDUeLYb9JRj706qhI5TvCzBZkVG2KS97xPYHGlXoPM52faZWIvxyK5dcctyp00kTC2muq5FNRGWKdSqQA/fDw748F6JmdGz/m/J2C8MwqjgazbmFxmcLp7aXqiSiI1/y5NpmBDBhCjrismxvaFeyAoCI8ZjbZMOptZM4c5f4Iwr9Fkvzu0hy2NCFvvGnoo6v1/2uhJ2O5WkoxkOco+8kUGgaGBLbH5aDaBCygF0ibo9ZAiNbVfbZc6CDuMmZNhLVRxU7pmaeQywYUKt/m/xXCJjN7NxJzm7AULIQHu4rlBmSAg==";

    const stream = Readable.from(
      getMicrosoftEvents(
        token,
        moment().format(DATE_FORMAT),
        moment().add(7, "d").format(DATE_FORMAT)
      )
    );

    return getArrayFromStream(stream)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  });
});
