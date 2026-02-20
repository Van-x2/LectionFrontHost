<script lang="ts">

  import { signIn } from "@auth/sveltekit/client";

</script>
<div class="w-screen h-screen relative font-poppins font-medium overflow-x-hidden flex flex-col bg-white">
  <div class="w-full h-[150px] flex items-center flex-shrink-0">
    <div class="w-full h-14">
      <div class="w-full h-full flex pl-[5%] pr-[7%] justify-between">
        <div class="h-full w-48 flex justify-center items-center self-start">
          <a href="/">
            <p class=" font-title text-[40px] text-primary">
              Lection
            </p>
          </a>
        </div>
        <div class="h-full w-[500px] self-end">
          <div class="w-full h-full p-[5px] px-[10px]">
            <div class="w-full h-full flex justify-end text-[14px]">
              <div class="w-[110px] h-full  mr-[10px] flex justify-center items-center">
                <a href="/landing/pricing">
                  <p class=" translate-y-[2px]">
                    Pricing
                  </p>
                </a>
              </div>
              <div class="w-[190px] h-full bg-sky-200 rounded-full flex justify-center items-center hover:bg-[#99d2f0] transition-colors duration-50">
                <button class="w-full h-full">
                  <p class=" translate-y-[2px]">
                    How does it work?
                  </p>
                </button>
              </div>
              <a href="/user">
                  <div class="w-[110px] h-full rounded-full border-[1px] border-primary ml-[35px] flex justify-center items-center group hover:bg-primary duration-100">
                    <div class="w-full h-full flex justify-center items-center group-hover:text-white duration-100">
                      <p class=" translate-y-[2px]">
                        Sign-in
                      </p>
                    </div>
                  </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full">
    <slot />
  </div>
</div>
