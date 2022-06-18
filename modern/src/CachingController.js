import { useDispatch, useSelector, connect } from 'react-redux';

import {
  geofencesActions, groupsActions, driversActions, maintenancesActions,
} from './store';
import { useEffectAsync } from './reactHelper';
import { BASEURL } from './constant';

const CachingController = () => {
  const authenticated = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  useEffectAsync(async () => {
    if (authenticated) {
      const response = await fetch(`${BASEURL}/api/geofences`);
      if (response.ok) {
        dispatch(geofencesActions.update(await response.json()));
      } else {
        throw Error(await response.text());
      }
    }
  }, [authenticated]);

  useEffectAsync(async () => {
    if (authenticated) {
      const response = await fetch(`${BASEURL}/api/groups`);
      if (response.ok) {
        dispatch(groupsActions.update(await response.json()));
      } else {
        throw Error(await response.text());
      }
    }
  }, [authenticated]);

  useEffectAsync(async () => {
    if (authenticated) {
      const response = await fetch(`${BASEURL}/api/drivers`);
      if (response.ok) {
        dispatch(driversActions.update(await response.json()));
      } else {
        throw Error(await response.text());
      }
    }
  }, [authenticated]);

  useEffectAsync(async () => {
    if (authenticated) {
      const response = await fetch(`${BASEURL}/api/maintenance`);
      if (response.ok) {
        dispatch(maintenancesActions.update(await response.json()));
      } else {
        throw Error(await response.text());
      }
    }
  }, [authenticated]);

  return null;
};

export default connect()(CachingController);
