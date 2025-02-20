import { getStorage } from '../storage/localStorage';
import { constants } from '../api/constants';
import { useGetAPI } from '../api/apiCalls';
import { ProfileContent } from '../components/profile/ProfileContent';
import { ErrorMessage } from '../components/ErrorMessage';

export function Profile() {
  const getUser = JSON.parse(getStorage('user'));
  const token = getUser.accessToken;

  const profileUrl =
    constants.base +
    constants.holidaze.base +
    constants.holidaze.profiles +
    getUser.name;

  const { data, error, loading } = useGetAPI(profileUrl, token);

  return (
    <div className="w-11/12 max-w-screen-2xl mx-auto mt-4 flex flex-col gap-10">
      {loading && <p>Loading...</p>}
      {error && <ErrorMessage />}
      {data && <ProfileContent user={data.data} />}
    </div>
  );
}
