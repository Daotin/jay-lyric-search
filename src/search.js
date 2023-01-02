import { Index, Document, Worker } from "flexsearch";

export function search() {
  var index = new FlexSearch({
    preset: "memory",
    tokenize: "forward",
    resolution: 5,
  });

  index.add(0, "John Doe");

  console.log('⭐idx.search("love")==>', index.search("John"));
}
