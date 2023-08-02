import { Routeable, addRouteable } from "../../core/router";

const resumeFile = __dir.filesByName['resume.html']!.buffer;

export const resumePage: Routeable = {
  route: '/resume.html',
  handle: () => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: resumeFile,
    };
  }
};

addRouteable(resumePage);
