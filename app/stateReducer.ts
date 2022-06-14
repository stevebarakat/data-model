export const busReducer = (state, action) => {
  switch (action.type) {
    case "reverb":
      return { count: state.count + 1 };
    case "delay":
      return { count: state.count - 1 };
    case "chorus":
      return { count: state.count + 1 };
    case "chebyshev":
      return { count: state.count - 1 };
    case "pitch-shift":
      return { count: state.count + 1 };
    case "compressor":
      return { count: state.count - 1 };
    default:
      break;
  }
};
