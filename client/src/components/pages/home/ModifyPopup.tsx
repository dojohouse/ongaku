import React from 'react';
import { Tag } from '../../../models';
import { Input } from '../../common';
import Popup from 'reactjs-popup';

interface ModifyPopupProps {
  modifyTag: Tag;
  openModifyTag: boolean;
  // eslint-disable-next-line
  setOpenModifyTag: any;
  // eslint-disable-next-line
  setModifyTag: any;
  loading: boolean;
  // eslint-disable-next-line
  deleteTagHandler: any;
  // eslint-disable-next-line
  modifyTagHandler: any;
}

const ModifyPopup: React.FC<ModifyPopupProps> = (props: ModifyPopupProps) => {
  const {
    modifyTag,
    setModifyTag,
    openModifyTag,
    setOpenModifyTag,
    deleteTagHandler,
    modifyTagHandler,
    loading,
  } = props;
  return (
    <Popup
      open={openModifyTag}
      closeOnDocumentClick
      modal
      onClose={() => setOpenModifyTag(false)}
      nested
    >
      <div className="p-5 rounded-lg">
        <div>
          <h2>Modify Music Card</h2>
        </div>
        <div>
          <Input
            className="py-2"
            label="Title"
            value={modifyTag.title}
            onChange={(event) =>
              setModifyTag({ ...modifyTag, title: event.target.value })
            }
          />
          <Input
            className="py-2"
            label="Music Id"
            value={modifyTag.musicId}
            onChange={(event) =>
              setModifyTag({ ...modifyTag, musicId: event.target.value })
            }
          />
          <div className="text-xxs">
            <mark className="bg-gray-200">
              Open Spotify → ••• (next to song/playlist) → Share → Copy Spotify
              URI
            </mark>
          </div>
          <Input
            className="py-2"
            label="Tag Id"
            value={modifyTag.tagId}
            disabled
          />
          <Input
            className="py-2"
            label="Platform"
            placeholder="Spotify"
            value="spotify"
            disabled
          />
        </div>
        <div className="pt-10 flex justify-between">
          <div
            className="flex pt-1 cursor-pointer"
            onClick={() => deleteTagHandler(modifyTag)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              color="darkred"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-trash-2"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>
          <div className="flex">
            <div>
              <button
                className="border-none py-1 px-2 mr-2"
                onClick={() => setOpenModifyTag(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                className="border-2 border-green-300 bg-green-300 py-1 px-2 rounded"
                onClick={() => modifyTagHandler(modifyTag)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default ModifyPopup;
