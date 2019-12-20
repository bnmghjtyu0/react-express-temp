// action creator

const auth = "AUTH";

export const authStatus = toggle => {
  return {
    type: "AUTH",
    toggle
  };
};
