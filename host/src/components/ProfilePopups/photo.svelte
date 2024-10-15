<script>
    import { page } from '$app/stores'
</script>
<div class="w-full h-full absolute z-20 flex justify-center items-center">
    <div class="w-[500px] h-[260px] bg-white border-[3px] border-accent rounded-[20px] p-3">
        <div class="w-full h-[25%]">
            <h1 class="text-[23px] font-medium font-poppins translate-y-[1px]">
                Photo
            </h1>
            <p class="text-[16px] font-poppins font-medium text-accent">
                Edit your preference then click save to update.
            </p>
        </div>
        <div class="w-full h-[75%] flex justify-end items-end">
            <div class="w-full h-full flex justify-center items-center">
                
            </div>

            <button class=" font-poppins w-[65px] h-[45px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100 absolute">
                <p class="text-[15px] font-medium translate-y-[1px]">Save</p>
            </button>

        </div>

    </div>
</div>