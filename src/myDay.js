export default function myDay(container) {
  const date = new Date();

  const options = {
    weekday: "long",
    //year: "numeric",
    month: "long",
    day: "numeric",
  };
  const myDayWrapper = document.createElement("div");
  myDayWrapper.setAttribute("id", "myDay");
  myDayWrapper.classList.add("tabContent");
  myDayWrapper.innerHTML = `
    <div class="flex font-mono font-semibold text-xl">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class=" h-6 w-8"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
  <span>My Day</span>
</div>
<span class="font-body text-sm font-thin italic">${date.toLocaleString(
    "en",
    options
  )}</span>

    `;
  container.appendChild(myDayWrapper);
  return myDayWrapper;
}
