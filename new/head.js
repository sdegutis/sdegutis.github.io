const frag = document.createElement('template');

frag.innerHTML = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
`;

document.head.append(frag.content);

// const meta = document.createElement('meta');
// meta.name = 'viewport';
// meta.content = 'width=device-width, initial-scale=1.0';
// document.head.append(meta);
