export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'registerUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'verifyuser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
