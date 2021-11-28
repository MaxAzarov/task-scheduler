export interface IMicrosoftEvent {
  "@odata.context": string;
  value: {
    "@odata.etag": string;
    id: string;
    subject: string;
    start: { dateTime: string; timeZone: string };
    end: { dateTime: string; timeZone: string };
    organizer: {
      emailAddress: {
        name: string;
        address: string;
      };
    };
  }[];
}
