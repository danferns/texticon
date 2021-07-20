# texticon

TextIcon generates icons based on the initials of a name. 


## Features

- Full CSS font customization
- The letters are **visually centered**
- The background can be a circle or a square
- The hue is generated based on the name
- - A `randomSeed` can be provided to the hue algorithm


## Installation

    npm install texticon


## Example

    import TextIcon from "texticon";

    const name = "Awesome Name";
    const icon = document.querySelector("#icon");
    icon.src = TextIcon(name, {
        circle: true,
        size: 256,
        font: "128px Helvetica",
        randomSeed: 1234
    });


## Options

### size

The size of the image in pixels. 
Default is `256`.

### font

The CSS [`font`](https://developer.mozilla.org/en-US/docs/Web/CSS/font) value. 
Default is `"128px sans-serif"`.

### circle

Whether to render the background as a circle or not. 
Default is `false`.

### randomSeed

A seed used when generating the color of the icon based on its name.
Randomize this value at each call if you want the same name to have different colors each time.
Default is `0`.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Thank you

- [isaacwritescode](https://github.com/isaacwritescode/) for naming this project.
- [MatthewCallis](https://github.com/MatthewCallis/) for [avatar](https://github.com/MatthewCallis/avatar), which served as the groundwork for TextIcon.