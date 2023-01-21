# TypeWriter
Create easily a TypeWriter effect for your website

> Written by Luuk Walstra
> 
> Discord: Luuk#8524
> 
> Github: https://github.com/Luuk-Dev
> 
> Replit: https://replit.com/@LuukDev
> 
> Repository: https://github.com/Luuk-Dev/TypeWriter

## How to use

### TypeWriter class
You need to call the `TypeWriter` class in your JavaScript. The class has two parameters. The first one is required, this is the element where you want to add the TypeWriter effect. This can be the element itself or a string to get the element. The second parameter is the custom options. This is an object with the following options:
- timeout: The time to wait before adding the new character to the string in miliseconds. Default is `100`ms.
- loop: Whether the TypeWriter should be looped for the element or not. Default is `false`.
- cursor: The cursor settings
   - speed: The speed of the cursor in miliseconds. Default is `1000`ms.
   - size: The size of the cursor in CSS. You can set the size for example to `28px`. Default is the `larger` property value.
   - id: The id of the `style` element which will be added in the `head` element for the cursor. You can customize this so you will be able to find it back easy. Default is `TypeWriter_Effect_CSS`.
   - enabled: Whether the cursor should be enabled or not. Default is `true`.
- callback: An object where you can put the available callbacks in.
   - onend: A callback which will be called once the TypeWriter ends. Only available if the `loop` is set to `false`.
   
### Functions:
The `TypeWriter` class has multiple functions to customize your typewriter.
- wait: Lets the typewriter wait a certain amount of milliseconds before performing the next action. Has one parameter where the amount of time in milliseconds should be provided
- write: The text that should be written with a TypeWriter effect. Has one parameter which is the text to write and must be a string.
- addText: Adds a text to the current string without the TypeWriter effect. Has one parameter which is the text to add and must be a string.
- removeAll: Removes all the current text with a TypeWriter effect. Has no parameters.
- remove: Removes a certain amount of characters from the current string. Has one parameter which is the last index of the character that should not be removed and must be a number.
- start: Starts the complete TypeWriter effect. Must be fired to start the TypeWriter effect. Has no parameters.
- stop: Stops the TypeWriter when it's running. Has no parameters.

## Demo
Watch a live demo [here](https://typewriter.luukdev.repl.co)

## Example
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Some page title</title>
    <style type="text/css">
      html, body{
        margin: 0;
        padding: 0;
        font-family: Arial;
      }
      .center{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }
    </style>
    <script type="text/javascript" src="https://typewriter.luukdev.repl.co/TypeWriter.js"></script>
  </head>
  <body>
    <div class="center">
      <h1 id="typewriter"></h1>
    </div>
    <script type="text/javascript">
      new TypeWriter(`#typewriter`, {
        loop: true,
        cursor: {
          speed: 700,
          size: 'larger',
          id: 'Some_TypeWriter_CSS',
          enabled: true
        },
        timeout: 50
      })
      .write(`Hello`)
      .wait(2000)
      .removeAll()
      .write(`Write here something`)
      .wait(2000)
      .remove(6)
      .write(`a book`)
      .wait(2000)
      .removeAll()
      .start();
    </script>
  </body>
</html>
```
