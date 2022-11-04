import { Resource } from '../../../../../../types/resources';

export type ResourceState = {
  resourcesList: undefined | Resource[];
  isLoading: boolean;
  error: any;
};
