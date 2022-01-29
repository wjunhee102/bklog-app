import { useEffect, useState } from "react";
import io from "socket.io-client";

function useSocket(url: string) {
  const [ currentSocket, setCurrentSocket ] = useState<any>(null);

  useEffect(() => {
    if(!currentSocket) {
      setCurrentSocket(io(url));
    } 
  }, []);

  return currentSocket;
}

export default useSocket;