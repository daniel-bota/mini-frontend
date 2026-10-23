# Mini-Frontend API

1. API utilizat: https://jsonplaceholder.typicode.com/posts pentru preluarea și adăugarea de articole.
2. Rezolvare CORS: Serviciul JSONPlaceholder include automat header-ul Access-Control-Allow-Origin: *; la un backend propriu acesta trebuie configurat pe server sau servit frontend-ul din același origin.
3. Status 200 OK: Cererea GET inițială descarcă primele articole și le randează în DOM folosind createElement și textContent.
4. Status 201 Created: La trimiterea formularului se trimite un POST cu JSON, iar noul element se adaugă la începutul listei locale fără alt apel de rețea.
5. Status 400 / 404 / 500: Erorile HTTP nu resping promisiunea fetch, așa că sunt tratate verificând dacă response.ok este fals și afișând mesajul.
6. Erori de rețea: Erorile de conexiune sau server oprit sunt prinse în blocul catch și afișate în caseta de stare.
7. Stări UI afișate: Se încarcă (în timpul apelului fetch), eroare (dacă apelul eșuează) și listă goală (dacă nu există articole).
8. Protecție XSS: Toate textele venite din API sau formular sunt puse prin textContent, fără innerHTML.
9. Delegarea evenimentelor: Butonul de ștergere este ascultat printr-un singur listener pe elementul părinte.
10. Responsive: verificat fără scroll orizontal la 360px.
