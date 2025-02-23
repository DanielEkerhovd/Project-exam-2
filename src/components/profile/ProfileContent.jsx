import { ManageVenues } from './ManagerVenues';
import { UserBookings } from './UserBookings';
import { useEffect, useState } from 'react';
import { usePutAPI } from '../../api/apiCalls';

import { constants } from '../../api/constants';
import { useNavigate } from 'react-router-dom';

import { useLoginStatus } from '../../hooks/loginStatus';

export function ProfileContent({ user, token }) {
  const { name, venueManager, avatar } = user;
  let { url } = avatar;

  const profileUrl = `${constants.base}${constants.holidaze.base}${constants.holidaze.profiles}${name}`;

  const { data, error, loading, putData } = usePutAPI();
  const { isLoggedIn, setLoggedOut } = useLoginStatus();

  const [editImage, setEditImage] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editError, setEditError] = useState(false);

  const navigate = useNavigate();

  const save = () => {
    setEditError(false);
    const value = document.getElementById('avatarImage').value;
    url = value;

    const payload = { avatar: { url } };
    putData(profileUrl, payload, token);

    if (error) {
      setEditError(true);
      return;
    }
  };

  useEffect(() => {
    if (data) {
      setEditImage(false);
    }
  }, [data]);

  const logOut = () => {
    setLoggedOut();
    location.reload();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <section className="flex items-center gap-2">
        <div className="">
          <img
            className="rounded-full size-[68px] md:size-[120px]"
            src={inputValue ? inputValue : url}
            alt="Profile image"
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{name}</h1>
          {venueManager && (
            <p className="font-light text-sm md:text-lg">Venue Manager</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setEditImage(!editImage)}
              className="size-7 bg-holidaze-dark rounded-lg flex items-center justify-center"
            >
              {editImage ? (
                <span className="text-white">X</span>
              ) : (
                <img className="size-4" src="/assets/edit.png" alt="Edit" />
              )}
            </button>
            <button
              className="bg-holidaze-highlight font-bold py-1 text-sm px-2 rounded w-fit"
              onClick={logOut}
            >
              Log out
            </button>
          </div>
        </div>
      </section>
      {editImage && (
        <div className="flex flex-col gap-2 max-w-[400px]">
          <div className="flex flex-col gap-1">
            <label htmlFor="avatarImage">Update your avatar</label>
            <input
              className="p-2 text-sm"
              id="avatarImage"
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          {loading && <p>Loading...</p>}
          {editError && (
            <p className="text-red-500 text-sm">Error updating avatar</p>
          )}
          <button
            className="bg-holidaze-highlight p-2 rounded-sm"
            onClick={save}
          >
            Save
          </button>
        </div>
      )}
      {venueManager && user._count.venues < 0 && (
        <button className="bg-holidaze-dark text-white font-bold py-2 px-4 rounded w-fit">
          Add venue
        </button>
      )}
      {venueManager && <ManageVenues user={user} />}
      <UserBookings user={user} />
    </>
  );
}
