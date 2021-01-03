import * as useStore from './useStore'
import * as selectors from './selectors'
import * as actions from './actions'
import * as reduce from './reducers'

export const Store = {
  ...useStore,
  ...selectors,
  ...actions,
  ...reduce,
}
