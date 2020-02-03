document.querySelector('form.player-info')
        .addEventListener('submit', async (event) => {
            const target = event.currentTarget;
            event.preventDefault();
            if (document.querySelector('input#player-one').value === document.querySelector('input#player-two').value
                || document.querySelector('input#player-one-rep').value === document.querySelector('input#player-two-rep').value) {
                alert('Credentials cannot be duplicated!');
                return;
            }
            const playerData = [ 
                document.querySelector('input#player-one').value,
                document.querySelector('input#player-two').value
            ];
            const playerRep = [
                document.querySelector('input#player-one-rep').value,
                document.querySelector('input#player-two-rep').value
            ];
            const size = document.querySelector('input[name="size"]:checked').value;
            const response = await fetch('/gamestart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerData: playerData,
                    playerRep: playerRep,
                    size: size
                })
            });
            boardHtml = await response.text();
            target.parentNode.nextSibling.nextSibling.remove();
            target.parentNode.remove();
            document.dispatchEvent(new MessageEvent('gameStart'));
        });