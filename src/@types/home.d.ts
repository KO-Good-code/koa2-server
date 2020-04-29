interface homeList {
  tags: string | string[];
  title: string;
  id: number;
  time: number;
}

interface Err extends Error {
  getCodeMag:Function
}


type Post = {
  contant: string;
  title: string;
  tags: string;
}