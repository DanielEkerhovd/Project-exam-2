import { ManageVenues } from './ManagerVenues';
import { UserBookings } from './UserBookings';
import { useEffect, useState } from 'react';
import { usePutAPI } from '../../api/apiCalls';

import { constants } from '../../api/constants';

export function ProfileContent({ user, token }) {
  const { name, venueManager, avatar } = user;
  let { url } = avatar;
  const customManager = false;

  const profileUrl = `${constants.base}${constants.holidaze.base}${constants.holidaze.profiles}${name}`;

  const { data, error, loading, putData } = usePutAPI();

  const [editImage, setEditImage] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editError, setEditError] = useState(false);

  const save = () => {
    setEditError(false);
    const value = document.getElementById('avatarImage').value;
    url = value;

    const payload = { avatar: { url } };
    putData(profileUrl, payload, token);

    if (error) {
      console.log('Error updating avatar');
      setEditError(true);
      return;
    }
  };

  useEffect(() => {
    if (data) {
      console.log('Avatar updated');
      console.log(data);
      setEditImage(false);
    }
  }, [data]);

  return (
    <>
      <section className="flex items-center gap-2">
        <div className="relative">
          <img
            className="rounded-full size-[68px]"
            src={inputValue ? inputValue : url}
            alt="Profile image"
          />
          <button
            onClick={() => setEditImage(true)}
            className="size-7 absolute bottom-0 right-0 bg-holidaze-dark rounded-lg flex items-center justify-center"
          >
            <img className="size-4" src="/assets/edit.png" alt="Edit" />
          </button>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{name}</h1>
          {venueManager && <p className="font-light text-sm">Venue Manager</p>}
        </div>
      </section>
      {editImage && (
        <div className="flex flex-col gap-2">
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

      {customManager ? (
        <ManageVenues user={user} />
      ) : (
        <UserBookings user={user} />
      )}
    </>
  );
}
