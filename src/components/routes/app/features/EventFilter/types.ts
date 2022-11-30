export type EventFilterProps = {
  selectedFilterResource: string;
  filterDate: string;
  setFilterDate: (a: string) => void;
  setResetted: (a: boolean) => void;
  setSelectedResource: (a: string) => void;
};
