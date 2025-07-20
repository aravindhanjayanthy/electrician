
  const input = document.querySelector("#phoneNumber");
  window.intlTelInput(input, {
    initialCountry: "in", // Default to India, change as needed
    separateDialCode: true,
    preferredCountries: ["in", "us", "gb"]
  });
