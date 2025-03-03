import React,{createContext} from 'react'

export const DataContext = createContext();

const UserContext= ({children})=> {
    const userdata=
    {

    }
  return (
    <div>
        <DataContext.Provider value={userdata}>
            {children}
        </DataContext.Provider>
    </div>
  )
}

export default UserContext