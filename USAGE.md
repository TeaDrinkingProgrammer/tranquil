If you haven't created a Zola site yet, create a new Zola site with the following command (assuming your site is called `myblog`):

```sh
zola init myblog
```

Enter the directory:

```sh
cd myblog
```

Add the Tranquil theme:

```sh
git submodule add https://github.com/teadrinkingprogrammer/tranquil.git themes/tranquil
```

The myblog directory now looks like this:

```
├── config.toml
├── content/
├── sass/
├── static/
├── templates/
└── themes/
    └── tranquil/
```

Create `myblog/content/_index.md` and `myblog/content/blog/_index.md`

If you want to display the projects page, also create `myblog/content/projects/_index.md`

```
├── config.toml
├── content/
│   ├── blog/
│   │   └── _index.md
│   ├── projects/
│   │   └── _index.md
│   └── _index.md
├── sass/
├── static/
├── templates/
└── themes/
    └── tranquil/
```

Modify the content of these files as follows:

`myblog/content/_index.md`:

```
+++
template = 'home.html'

[extra]
lang = 'en'
+++

Words about you
```

`myblog/content/blog/_index.md`:

```
+++
title = "My Blog"
description = "My blog site."
sort_by = "date"
template = "blog.html"
page_template = "post.html"
insert_anchor_links = "left"
generate_feed = true

[extra]
lang = 'en'
display_tags = true
truncate_summary = false
+++
```

`myblog/content/projects/_index.md`:

```
+++
title = "My Projects"
description = "My projects page."
template = "projects.html"

[extra]
lang = 'en'
+++
```

Create a new directory `icons` under `myblog/static` and place your favicons. I recommend first compressing your logo using [TinyPNG]() and then using [RealFaviconGenerator](https://realfavicongenerator.net/) to generate your favicons. At the bottom of the selection screen, set the path to "icons" and paste your generated favicons in this folder.
Also put your avatar picture file `avatar.webp` in this folder, preferably in webp format.

```
...
├── static/
│   └── img/
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       └── avatar. webp
...
```

## Configuration

Copy the contents of `myblog/themes/tranquil/config.example.toml` to `myblog/config.toml`, refer to the comments in the file and Zola's [documentation](https://www.getzola.org/documentation/getting-started/overview/) to modify accordingly.

### Icons

- Copy `myblog/themes/tranquil/static/icon` directory to `myblog/static/icon`.

To change the Icons for links (like social media), place a 

- Find the svg file of the icon you want, modify its width and height to 24, and the color to currentColor:

  `... width="24" height="24" ... fill="currentColor" ...`

- The default icons are from [HeroIcons](https://heroicons.com/) and [Simple Icons](https://simpleicons.org). The logos from Simple Icons were modified with ```fill="currentColor" class="w-6 h-6"``` at the end of their SVG tag (check the Github icon for more info).

### Code highlight

- Copy `myblog/themes/tranquil/highlight_themes` directory to `myblog/highlight_themes`. Alternatively, use symlinks (mklink /H on windows, ln -s on Linux) to link the theme files. In this case, make a relative link from myblog/highlight_themes to ../themes/tranquil/highlight_themes/ (use \ for Windows) for both tranquil-light.tmTheme and tranquil-dark.tmTheme.

- If you set `highlight_theme` in `config.toml` to one of Zola's [built-in highlight themes](https://www.getzola.org/documentation/getting-started/configuration/#syntax-highlighting), you will get that theme used in both light and dark mode.

- By default Tranquil use different themes for light/dark modes, configured by `highlight_theme`, `extra_syntaxes_and_themes` and `highlight_themes_css`. The default highlight theme `tranquil-light` `tranquil-dark` is a modified version of Serenes version of [Tomorrow](https://github.com/ChrisKempson/Tomorrow-Theme) with the background changed to work with Tailwind.

- If you want a different theme, find the `.tmTheme` TextMate file of your theme, put it in `myblog/static/highlight_themes`, and then modify the `theme` value of `highlight_themes_css` to that file's name, without `.tmTheme` extension. This will generate a `hl-light.css` and a `hl-dark.css` file in `myblog/static/`, you may have to delete them first before you change the `theme` value, so Zola can re-generate. To make the theme work play nice with Tailwind, you could change the background colors to one of the values of [the default pallet](https://tailwindcss.com/docs/customizing-colors#default-color-palette). The default theme uses the stone theme.

```xml
...
	<string>Tomorrow Night</string>
	<key>settings</key>
	<array>
		<dict>
			<key>settings</key>
			<dict>
				<key>background</key>
        <string>#292524</string> <!-- This is the background value -->
				<key>caret</key>
				<string>#AEAFAD</string>
				<key>foreground</key>
				<string>#C5C8C6</string>
...
```

- You can find some TextMate themes on [this website](https://tmtheme-editor.glitch.me/).

### RSS

- You can add RSS or Atom to your site: Zola's default feed file is located in the root directory of the site, set `generate_feeds = true` in `config.toml`. `feed_filenames` can be set to `[atom.xml]` or `[rss.xml]` , corresponding to two different feed file standards. I currently only support one or the other, since I only support Atom on my own blogs, PRs are welcome. Set `generate_feed = false` in `myblog/content/blog/_index.md` if you want to disable this feature.

- The Tranquil theme looks more like a personal website, the posts are in the `/blog` directory. You may want the feed file to be in the `/blog` directory instead of the root directory, which requires you to set `generate_feeds = false ` `feed_filenames = "[atom.xml]"` in `config.toml`, and set `generate_feed = true` in `myblog/content/blog/_index.md`

### Projects page

- Tranquil has a projects page where you can showcase your projects, products, etc.

- Set `projects_page = true` in `config.toml`, create a new `data.toml` under `myblog/content/projects`, add projects information in it, the format is as follows:

  ```toml
  [[project]]
  name = ""
  desc = ""
  tags = ["", ""]
  links = [
    { name = "", url = "" },
    { name = "", url = "" },
  ]

  [[project]]
  name = ""
  desc = ""
  tags = ["", ""]
  links = [
    { name = "", url = "" },
    { name = "", url = "" },
  ]
  ```

### Outdated alert

- If one of your posts quickly becomes outdated, you can set an outdated alert to be displayed on the page after certain days

- `outdate_alert` and `outdate_alert_days` in `config.toml` set the default values for whether to show an outdated warning and when respectably. The values can be overriden on individual posts. This is done by setting `outdate_alert` in `config.toml` to `false`, and then enable it separately in the front matter of time-sensitive posts.

- `outdate_alert_text_before` and `outdate_alert_text_after` are the specific content of the alert, before and after the number of days respectively

### Comments

- Tranquil supports using [giscus](https://giscus.app) to enable comments.

- To enable it, you need to create `myblog/templates/_giscus_script.html` and put the script configured on the giscus website into it, then change the value of `data-theme` to `https://<your-domain-name>/giscus_light.css`, replace `<your-domain-name>` with you domain name, same as `base_url` in `config.toml`

- `comment = true` in `config.toml` sets all posts to enable comments, you can set `comment = false` under `[extra]` in the front matter of the post to control whether a specific post displays comments

### Call to Action footer
You can enable a "Call to action footer" for your blogs. This is a place to put an option for readers to subscribe to RSS, email etc.

Enable it by setting `call_to_action_footer = true` in `config.toml`. Add text to the footer using `call_to_action_footer_text`. You need to make a template yourself by making a file called `_call_to_action_footer` in the templates folder. This is an example of how you can use this template:

```html
<div class="flex flex-col gap-8">
    {% if page.extra.call_to_action_footer_text is defined %}{% set call_to_action_footer_text = page.extra.call_to_action_footer_text %}{% else %}{% set call_to_action_footer_text = config.extra.call_to_action_footer_text %}{% endif %}
    <p class="[&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-2 [&>a]:decoration-sky-500 [&>a]:dark:decoration-sky-400">{{ call_to_action_footer_text | safe }} </p>
    <div class="flex gap-5">
        <form
        class="flex flex-col gap-2 w-1/2"
        >
            <input aria-label="Email input field" class="p-2 bg-stone-300 dark:bg-stone-700n placeholder:text-slate-700 dark:placeholder:text-slate-900" placeholder="Enter your email address"  type="email" name="email" id="bd-email" />
            
            <input class="rounded-md text-black dark:bg-sky-600 p-2 bg-sky-500" type="submit" value="Subscribe" />
        </form>
        <div class="flex justify-center items-center w-1/2">
            {% set rss_icon = load_data(path="static/icon/rss.svg") %}
            {% if section.generate_feed -%}
            <a class="" href="{{ config.base_url }}/blog/{{ config.feed_filename }}" aria-label="rss feed">{{ rss_icon | safe }}</a>
            {% elif config.generate_feed -%}
            <a class="" href="{{ config.base_url }}/{{ config.feed_filename }}" aria-label="rss feed">{{ rss_icon | safe }}</a>
            {% endif %}
        </div>
    </div>
</div>
```

Example of the config.toml:
```
call_to_action_footer_text = "Did you like this blogpost? Then consider subscribing via email or RSS. The email newsletter uses <a href=\"https://www.linktomailprovider.com" target=\"_blank\"> Mailprovider</a>."

call_to_action_footer = true
```

### Analytics

- To place scripts for analytics tools (such as Google Analytics, Umami, Goatcounter, etc.), you can create a new `myblog/templates/_head_extend.html` and put the corresponding content in it. The content of this file will be added to the html head of each page.

### Customization
To customise the style, it is recommended to use inline Tailwind classes. Don't forget to run `npx run tw` or `bun run tw` in the themes/tranquil folder when editing HTML files or editing CSS files.

- In most cases, you shouldn't have to edit the CSS override file. If you do want to edit the override CSS file directly, you need to edit it in `myblog/themes/tranquil/style/styles.css`. This is because Tailwind cannot compile files that may or may not exist.

- Tranquil uses the Lato font of [Brick](https://brick.im/fonts/lato/) by default. If you want a different font, create a new `myblog/templates/_custom_font.html` and put the font link tags you copied from google fonts website into it, and then modify `--main-font` or `--code-font` in `myblog/sass/main.scss`. For performance reasons, you may want to self-host (Google) font files (optional): 
  1. Open [google-webfonts-helper](https://gwfh.mranftl.com) and choose your font
  2. Modify `Customize folder prefix` of step 3 to `/font/` and then copy the css
  3. Replace the content of `myblog/templates/_custom_font.html` with a `<style> </style>` tag, with the css you just copied in it.
  4. Download step 4 font files and put them in `myblog/static/font/` folder


- If you want to customize more, you only need to copy the files under the `templates`, `static`, `sass` directory in the corresponding `themes/tranquil` to the same name directory of myblog, and modify it. Be careful not to directly modify the files under the Tranquil directory, because these modifications may cause conflicts if the theme is updated

## Writing

### front matter

- The content inside the two `+++` at the top of the post markdown file is called front matter, and the supported configuration items are as follows:

  ```md
  +++
  title = ""
  date = 2022-01-01
  draft = true
  
  [taxonomies]
  categories = ["one"]
  tags = ["one", "two", "three"]
  
  [extra]
  lang = "en"
  toc = true
  comment = true
  copy = true
  math = false
  mermaid = false
  outdate_alert = true
  outdate_alert_days = 120
  +++

  new post about somthing...

  <!-- more -->

  more post content...
  ```

- You can add a `<!-- more -->` line, the content before it will become the summary/description of the post. You can set `truncate_summary = true` in `myblog/content/blog/_index.md` to remove the summary from the post webpage.

- Put your post files in the `myblog/content/blog` folder. If you want your posts to stay hidden, set `draft` to `true`.

### Shortcodes

- Zola supports 'shortcodes', which can add some extra styles or templates for in addition to the standard markdown format

- Zola support some [annotations for code blocks](https://www.getzola.org/documentation/content/syntax-highlighting/#annotations). Tranquil adds another one to show the file name by a `codeblock` shortcode:

  ```md
  {% codeblock(name="path/to/file") %}
  // a markdown code block ...
  {% end %}
  ```

- In addition to the `![img](/path/to/img)` of standard markdown, Tranquil also supports a `figure` shortcode to adds some explanatory text to the image, the format is as follows:

  ```md
  {{ figure(src="path/to/img", alt="alt text", caption="caption text") }}
  ```

  This will be displayed as `<figure></figure>` in HTML on the web page instead of `<img>`, and the content of the caption will be centered below the image. The alt attribute is optional but recommended to help enhance accessibility

  Adding attribution information to images is very common, you can directly use the `via` attribute, which will display a link named via below the image:

  ```md
  {{ figure(src="path/to/img", alt="some alt text", via="https://example.com") }}
  ```

### Callout

- Tranquil also uses shortcodes to implement callouts. You can see callouts in action on [this page](https://teadrinkingprogrammer.github.io/tranquil-demo/blog/callouts/) of the demo site. There are currently 6 types: `note` `important ` `warning` `alert` `question` `tip`. The format is as follows (the header attribute is optional):

  ```md
  {% note(header="Note") %}
  note text
  {% end %}
  ```

- If people read your posts via rss reader, these callouts will appear as normal `<blockquote>`

### KaTeX

- Set `math = true` in the front matter to enable [KaTeX](https://katex.org/) support.

- Inline formula `$...$`, block-level formula `$$...$$`

I personally do not use much math in my posts, so if you notice some funky formatting, please make an issue.
### Mermaid

- Set `mermaid = true` in the front matter to enable [Mermaid](https://github.com/mermaid-js/mermaid) support, and then insert a chart in the following format:

  ```md
  {% mermaid() %}
  flowchart LR
  A[Hard] -->|Text| B(Round)
  B --> C{Decision}
  C -->|One| D[Result 1]
  C -->|Two| E[Result 2]
  {% end %}
  ```

I also don't use Mermaid much myself, so if something is of, please make an issue.

# Development
I personally use Bun/bunx, but NPM, Yarn, PNPM or any other package manager will work just fine as well.
I have purposefully ignored all lock files, because the package.json is only used to run 2 compilation commands.

## Local build

Local preview:

Run Tailwind with --watch flag in one console (tranquil folder):
```sh
npx run tw
```

Serve Zola (root folder)
```sh
zola serve
```

Build the site:

```sh
zola build
```

## Deploy

For deployment, you can use Zolas documentation about [deployment](https://www.getzola.org/documentation/deployment/overview/).

Next to the usual steps, you also need to run the tailwind compile command. For inspiration, have a look at the [Github CI file](https://github.com/TeaDrinkingProgrammer/tranquil-demo/blob/main/.github/workflows/main.yml) of the demo website.

## Update

Please check the CHANGELOG on github for breaking changes before updating the theme

```sh
git submodule update --remote themes/tranquil
```
