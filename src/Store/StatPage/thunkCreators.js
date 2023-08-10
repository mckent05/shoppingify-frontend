import { loadingStatus, getStatistics } from "./Statisticsreducer";
import { getToken, baseURL } from "../utils/session";

export const fetchStatistics = () => async (dispatch) => {
  const token = getToken();
  dispatch(loadingStatus(true));
  const stats = await fetch(`${baseURL}/api/v1/cart_lists`, {
    headers: { Authorization: token },
  });
  const response = await stats.json();
  dispatch(getStatistics(response.data));
  dispatch(loadingStatus(false));
};
