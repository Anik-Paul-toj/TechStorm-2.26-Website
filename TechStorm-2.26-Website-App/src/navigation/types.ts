export type RootTabParamList = {
  HomeTab: undefined;
  EventsTab: undefined;
  TeamsTab: undefined;
  ScheduleTab: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
