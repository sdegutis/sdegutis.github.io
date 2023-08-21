const head = document.createElement('template');
head.innerHTML = `
  <title>Steven Degutis</title>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="manifest" href="/meta/site.webmanifest">
  <link rel="apple-touch-icon" sizes="180x180" href="/meta/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Karla:wght@400;700&family=Montserrat:wght@100;400;700&display=swap" rel="stylesheet">
`;
document.head.append(head.content);
