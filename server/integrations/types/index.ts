export interface Event {
  id: string;
  subject: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  link?: string;
  //   organizer: {
  //     emailAddress: {
  //       name: string;
  //       address: string;
  //     };
  //   };
}
