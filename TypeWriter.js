/**
 * @license MIT
 * 
 * Written by Luuk Walstra
 * Discord: Luuk#8524
 * Github: https://github.com/Luuk-Dev
 * Replit: https://replit.com/@LuukDev
 * Repository: https://github.com/Luuk-Dev/TypeWriter
 * 
 * You're free to use this library as long as you keep this statement in this file
 */
class TypeWriter{
    constructor(object, options){
        if(typeof object !== 'string' && typeof object !== 'object') return console.error(`Invalid element! Element must be a string or an object.`);
        this.element = typeof object === 'object' ? object : document.querySelector(object);
        if(!this.element) return console.error(`The element does not exists!`);
        this.save = [];
        this.options = options || {};
        this.timeout = this.options.timeout || 100;
        const defaultcursor = {
          speed: 1000,
          size: 'larger',
          id: 'TypeWriter_Effect_CSS',
          enabled: true
        };
        const cursor = this.options.cursor || defaultcursor;
        const stylesheet = document.createElement(`style`);
        stylesheet.type = "text/css";
        stylesheet.innerHTML = `#typewriter-effect{font-size:${cursor.size || defaultcursor.size};animation:TypeWriter ${(cursor.speed || defaultcursor.speed)/1000}s infinite;}@keyframes TypeWriter{0%{opacity: 0;}50%{opacity: 1;}100%{opacity: 0;}}`;
        stylesheet.id = cursor.id || defaultcursor.id;
        if((cursor['enabled'] || defaultcursor.enabled) === true) document.head.appendChild(stylesheet);
    }
    wait(ms){
        if(typeof ms !== 'number') return console.error(`Invalid number! MS must be a number.`);
        this.save.push({wait: ms, value: null, remove: null});
        return this;
    }
    write(value){
        if(typeof value !== 'string') return console.error(`Invalid value! Value must be a string.`)
        this.save.push({wait: null, value: value, remove: null});
        return this;
    }
    removeAll(){
        this.save.push({wait: null, value: null, remove: true});
        return this;
    }
    remove(charAt){
        if(typeof charAt !== 'number') return console.error(`Invalid position of string! The position must be a number.`);
        this.save.push({wait: null, value: null, remove: charAt});
        return this;
    }
    start(){
        if(!document.querySelector(`#typewriter-effect`)){
          this.element.innerHTML = `<span id="typewriter-typer"></span>`;
          if(typeof this.options.cursor === 'object'){
            if(this.options.cursor['enabled'] !== false){
              this.element.innerHTML += `<span id="typewriter-effect">|</span>`;
            }
          } else this.element.innerHTML += `<span id="typewriter-effect">|</span>`;
        }
        (async () => {
            var i;
            for(i = 0; i < this.save.length;){
                const obj = this.save[i];
                if(obj.wait){
                    await this.__wait(obj.wait);
                    ++i;
                } else if(obj.value){
                    const text = document.querySelector(`#typewriter-typer`);
                    if(!text) return ++i;
                    var val = text.innerHTML;
                    var objlength = '';
                    while(objlength !== obj.value){
                        await this.__wait(this.timeout);
                        val = val + obj.value.charAt(objlength.length);
                        objlength += obj.value.charAt(objlength.length);
                        text.innerHTML = val;
                    }
                    ++i;
                } else if(obj.remove){
                    if(obj.remove === true){
                        const text = document.querySelector(`#typewriter-typer`);
                        if(!text) return ++i;
                        var val = text.innerHTML;
                        while(val !== ''){
                            await this.__wait(this.timeout);
                            val = val.substring(0, val.length - 1);
                            text.innerHTML = val;
                        }
                        ++i;
                    } else {
                        const text = document.querySelector(`#typewriter-typer`);
                        if(!text) return ++i;
                        var val = text.innerHTML;
                        while(val !== val.substring(0, obj.remove)){
                            await this.__wait(this.timeout);
                            val = val.substring(0, val.length - 1);
                            text.innerHTML = val;
                        }
                        ++i;
                    }
                }
            }
            while(i !== this.save.length){
                await this.__wait(this.timeout);
            }
            if(this.options.loop) this.start();
        })();
    }
    __wait(ms){
        return new Promise((resolve, reject) => {
            setTimeout(resolve, ms);
        });
    }
}
