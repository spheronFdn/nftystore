export const checkUploadFileValidity = (
  images: File[],
  json: File[]
): string => {
  const imagejsonmap = new Map<string, number>();
  let error: string[] = [];
  let badFiles: string[] = [];
  console.log("IMAGE: ", images, json);
  if (images.length !== json.length) {
    return "Please make sure that each image has a corresponding json";
  } else if (images.length === json.length) {
    images.forEach((image: File) =>
      imagejsonmap.set(
        image.name.slice(
          0,
          image.name.length - image.type.split("/")[1].length - 1
        ),
        0
      )
    );
    json.forEach((json: File) =>
      imagejsonmap.set(
        json.name.slice(
          0,
          json.name.length - json.type.split("/")[1].length - 1
        ),
        1
      )
    );
    imagejsonmap.forEach(
      (val: number, key: string) =>
        val === 0 &&
        badFiles.push(
          images.find(
            (image: File) =>
              image.name.slice(
                0,
                image.name.length - image.type.split("/")[1].length - 1
              ) === key
          )!.name
        )
    );
    if (badFiles.length)
      error.push(
        `Please make sure that ${badFiles.join(", ")} have a correspoding json`
      );
    badFiles = [];
    imagejsonmap.clear();
    json.forEach((json: File) =>
      imagejsonmap.set(
        json.name.slice(
          0,
          json.name.length - json.type.split("/")[1].length - 1
        ),
        0
      )
    );
    images.forEach((image: File) =>
      imagejsonmap.set(
        image.name.slice(
          0,
          image.name.length - image.type.split("/")[1].length - 1
        ),
        1
      )
    );
    imagejsonmap.forEach(
      (val: number, key: string) =>
        val === 0 &&
        badFiles.push(
          json.find(
            (json: File) =>
              json.name.slice(
                0,
                json.name.length - json.type.split("/")[1].length - 1
              ) === key
          )!.name
        )
    );
    if (badFiles.length)
      error.push(
        `Please make sure that ${badFiles.join(", ")} have a correspoding image`
      );
    return error.join(" or ");
  } else return "";
};

export const getStepNumber = (path: string): number => {
  switch (path) {
    default:
    case "select-provider":
      return 1;
    case "upload-files":
      return 2;
    case "choose-url":
      return 3;
  }
};
