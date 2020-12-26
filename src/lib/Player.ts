import Creature from './Creature';

type PlayerAction = 'none' | 'moveUp' | 'moveRight' | 'moveDown' | 'moveLeft';
type KeyMap = Record<string, PlayerAction>;

export default class Player extends Creature
{
    action?: PlayerAction;

    static keyMap: KeyMap = {
        'w': 'moveUp',
        'a': 'moveLeft',
        's': 'moveDown',
        'd': 'moveRight',
    };

    registerEvents()
    {
        super.registerEvents();

        document.addEventListener('keydown', (event: KeyboardEvent) => {
            const action = Player.keyMap[event.key];
            if (action) {
                console.log('register ' + action);
                this.action = action;
            }
        });
    }

    takeTurn(): Promise<void>
    {
        return new Promise(resolve => {
            console.log('do ' + this.action);
            switch (this.action) {
                case 'moveLeft':
                    this.moveLeft();
                    break;
                case 'moveRight':
                    this.moveRight();
                    break;
                case 'moveUp':
                    this.moveUp();
                    break;
                case 'moveDown':
                    this.moveDown();
            }

            this.action = undefined;
            resolve();
        });
    }

}
