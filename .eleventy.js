// START 11TY imports
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";
// END 11TY imports

// START LibDoc imports
import libdocConfig from "./_data/libdocConfig.js";
import libdocFunctions from "./_data/libdocFunctions.js";
// END LibDoc imports

export default function (eleventyConfig) {
    // START PLUGINS
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, libdocFunctions.pluginsParameters.eleventyImageTransform());
    eleventyConfig.addPlugin(pluginRss);
    // END PLUGINS

    // START FILTERS
    eleventyConfig.addAsyncFilter("autoids", libdocFunctions.filters.autoids);
    eleventyConfig.addAsyncFilter("embed", libdocFunctions.filters.embed);
    eleventyConfig.addAsyncFilter("cleanup", libdocFunctions.filters.cleanup);
    eleventyConfig.addAsyncFilter("dateString", libdocFunctions.filters.dateString);
    eleventyConfig.addAsyncFilter("datePrefixText", libdocFunctions.filters.datePrefixText);
    eleventyConfig.addAsyncFilter("toc", libdocFunctions.filters.toc);
    eleventyConfig.addAsyncFilter("sanitizeJSON", libdocFunctions.filters.sanitizeJson);
    eleventyConfig.addAsyncFilter("gitLastModifiedDate", libdocFunctions.filters.gitLastModifiedDate);
    // END FILTERS

    // START COLLECTIONS
    eleventyConfig.addCollection("myTags", libdocFunctions.collections.myTags);
    eleventyConfig.addCollection("postsByDateDescending", libdocFunctions.collections.postsByDateDescending);
    // END COLLECTIONS

    // START SHORTCODES
    eleventyConfig.addShortcode("alert", libdocFunctions.shortcodes.alert);
    eleventyConfig.addPairedShortcode("alertAlt", libdocFunctions.shortcodes.alert);
    eleventyConfig.addShortcode("embed", libdocFunctions.shortcodes.embed);
    eleventyConfig.addShortcode("icomoon", libdocFunctions.shortcodes.icomoon);
    eleventyConfig.addShortcode("icon", libdocFunctions.shortcodes.icon);
    eleventyConfig.addShortcode("iconCard", libdocFunctions.shortcodes.iconCard);
    eleventyConfig.addPairedShortcode("sandbox", libdocFunctions.shortcodes.sandbox);
    eleventyConfig.addPairedShortcode("sandboxFile", libdocFunctions.shortcodes.sandboxFile);
    // END SHORTCODES

    //Java Code Runner Passthrough
    eleventyConfig.addShortcode("runjava", function (name, code) {
        const encoded = encodeURIComponent(code);
        const safeId = name.replace(/[^a-zA-Z0-9]/g, "_");
        const baseUrl = "https://onecompiler.com/embed/";

        const params = [
            "language=java",
            "hideLanguageSelection=true",
            "hideNew=true",
            "hideTitle=true",
            "hideEditorOptions=true",
            "hideNewFileOption=true",
            "hideStdin=true",
            "fontSize=16",
            "listenToEvents=true",
            "hideResult=false"
        ].join("&");

        const src = `${baseUrl}?${params}`;

        return `
      <div class="java-runner mb-6">
        <h4 class="font-semibold mb-2">${name}</h4>
        <iframe
          id="oc-editor-${safeId}"
          src="${src}"
          width="100%"
          height="200"
          frameborder="0"
          style="border-radius:8px;overflow:hidden;"
        ></iframe>

        <script>
          (function() {
            const iframe = document.getElementById("oc-editor-${safeId}");
            const encodedCode = "${encoded}";

            iframe.addEventListener("load", function() {
              iframe.contentWindow.postMessage({
                eventType: "populateCode",
                language: "java",
                files: [{ name: "Main.java", content: decodeURIComponent(encodedCode) }]
              }, "*");
            });
          })();
        </script>
      </div>
    `;
    });




    // START FILE COPY
    eleventyConfig.addPassthroughCopy("sandboxes");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("core/assets");
    eleventyConfig.addPassthroughCopy("favicon.png");
    // END FILE COPY

    return {
        pathPrefix: libdocConfig.htmlBasePathPrefix
    }
};