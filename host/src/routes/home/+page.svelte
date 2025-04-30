<script lang="ts">
    import { page } from "$app/stores";
    import { Chart, type ChartItem } from "chart.js";
    import { DoughnutController } from 'chart.js';
    import 'chart.js/auto'
    import { onMount } from "svelte";
  
    let BulletinItems: any = $page.data.session?.BulletinBoardEntries;

    let insightsGraph: HTMLCanvasElement
    let insightsChart: any

    let timeMeterCanvasBackground: HTMLCanvasElement;
    let timeMeterCanvas: HTMLCanvasElement;
    
    let lectionMins: any = $page.data.session?.user?.lobbyMinutesUsed
    if(Number.isNaN(lectionMins)) {
        lectionMins = 1
    }
    let lectionMinsMax = 18000
    let lectionMinsRatio = Math.floor((lectionMins / lectionMinsMax) * 100)


    let currentTimeScale: string = '1 month' 

  
    onMount(() => {

        new Chart(timeMeterCanvasBackground, {
    type: "doughnut",
    data: {
        labels: ["Elapsed", "Remaining"],
        datasets: [
            {
                data: [100],
                backgroundColor: ["#D9D9D9"],
                borderRadius: 10, // Adjust the radius for rounded edges
                borderWidth: 0,


            },
        ]
    },
    options: {
        rotation: -90, // Start from the top center
        circumference: 180, // Display only the top half for a half-donut effect
        cutout: "75%", // Inner cutout for donut style
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }
        })


        if(($page.data.session?.user?.membershipLevel) === 'standard') {
            new Chart(timeMeterCanvas, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [lectionMinsRatio, (100 - lectionMinsRatio)], // Completed and remaining portions
                backgroundColor: ["#1E5167", "rgba(0,0,0,0)"], // Single color with transparent remainder
                borderRadius: 10, // Rounded edges
                borderWidth: 0,
            },
        ]
    },
    options: {
        rotation: -90, // Start from the top center
        circumference: 180, // Display only the top half for a half-donut effect
        cutout: "75%", // Inner cutout for donut style
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // Hide the legend
            }
        }
    }
        })
        }
        else {
            new Chart(timeMeterCanvas, {
    type: "doughnut",
    data: {
        datasets: [
            {
                data: [100], // Completed and remaining portions
                backgroundColor: ["#1E5167", "rgba(0,0,0,0)"], // Single color with transparent remainder
                borderRadius: 10, // Rounded edges
                borderWidth: 0,
            },
        ]
    },
    options: {
        rotation: -90, // Start from the top center
        circumference: 180, // Display only the top half for a half-donut effect
        cutout: "75%", // Inner cutout for donut style
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // Hide the legend
            }
        }
    }
        })
        }

        const config: any = { 
            type: 'line', 
            data: { 
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], 
                datasets: [{ 
                label: 'Sample Data', 
                data: [32, 76, 28, 47, 50, 90, 76], 
                borderColor: 'rgb(30, 81, 103)',
                tension: 0.3,
                fill: false,
                pointRadius: 0
                }] 
            }, 
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                animation: { 
                duration: 1000,
                easing: 'easeInOutQuart'
                }, 
                plugins: { 
                legend: { 
                    display: false
                }
                },
                scales: { 
                x: { 
                    grid: { 
                    display: false
                    }, 
                    ticks: { 
                    display: false,
                    padding: 15
                    }
                }, 
                y: {
                    beginAtZero: true, 
                    max: 100,
                    ticks: {
                    stepSize: 25,
                    padding: 15,
                    callback: function(value :any, index: any) {
                        return ['0%', '25%', '50%', '75%', '100%'][index];
                    },
                    font: {
                        family: "'Poppins', 'sans-serif'",    // Font family
                        size: 14,           // Font size in pixels
                        weight: '400',     // Can be 'normal', 'bold', '500', etc.
                        style: 'normal'     // Can be 'normal', 'italic'
                    },
                    color: '#D9D9D9',     // Text color
                    align: 'center',      // Text alignment
                    crossAlign: 'center'  // Cross-axis alignment
                    }, 
                    grid: { 
                    color: 'rgba(239, 239, 239)',
                    lineWidth: 1,
                    drawBorder: false,
                    drawTicks: false,
                    drawOnChartArea: true,
                    setLineDash: [5, 5]
                    }, 
                    border: { 
                    display: false
                    }
                } 
                } 
            } 
        }

       insightsChart = new Chart(insightsGraph, config)


    })

    $: if (insightsChart) {
        insightsChart.data = {
            // Update your data here based on currentTimeScale
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sample Data',
                data: [32, 76, 28, 47, 50, 90, 76],
                borderColor: 'rgb(30, 81, 103)',
                tension: 0.3,
                fill: false,
                pointRadius: 0
            }]
        };
        insightsChart.update();
        console.log(currentTimeScale);
    }

  </script>

<div class="w-full h-full flex-col flex">
    <div class="w-full h-[120px] ">
        
    </div>
    <div class="w-full flex-grow flex">

        <div class="h-full w-[35%] px-6 pb-6">
            <div class="w-full h-full flex flex-col">

                <div class="w-full h-[120px] mb-8 rounded-[20px] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] shadow-accent flex justify-center items-center">
                    <p class=" font-normal italic text-accent text-[35px] text-center overflow-hidden -lg:text-[30px]">Welcome back {(($page.data.session?.user?.firstname)?.split(' ')[0] || '').replace(/\s/g, '').replace(/^(.)(.*)$/, (_, first, rest) => first.toUpperCase() + rest.toLowerCase())}!</p>
                </div>

                <div class="w-full flex-grow bg-gray1 rounded-[20px] flex flex-col px-5 pb-5">
                    <div class="w-full h-[80px] flex justify-center items-center">
                        <p class=" text-[22px] font-poppins font-medium text-darkgray">Bulletin Board</p>
                    </div>
                    <div class="w-full flex-grow">
                        <div class="relative w-full h-full">
                            <div class="absolute inset-0">
                                <div class="w-full h-full overflow-y-scroll hide-scrollbar rounded-[20px]"
                                     style="-ms-overflow-style: none; scrollbar-width: none; ::-webkit-scrollbar"
                                >
                                    {#each BulletinItems as item}
                                        <div class="w-full h-fit bg-white rounded-[20px] p-3 mb-4">
                                            <h1 class="text-darkgray font-poppins font-semibold my-1">
                                                {item.Date}
                                            </h1>
                                            <p class="text-accent font-poppins font-medium">
                                                {item.TextContent}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                


            </div>
        </div>

        <div class="h-full w-[65%] pb-6 pr-6 flex flex-col">

            <div class="w-full flex-grow bg-gray1 rounded-[20px] flex flex-col px-3 pb-3">
                <div class="w-full h-[80px] flex items-center">
                    <h1 class=" text-[22px] font-poppins font-medium text-darkgray ml-7 text-nowrap">Lectionary Insights</h1>

                    <div class="w-fit px-4 h-[53px] flex items-center mx-8 bg-white shadow-sm rounded-full -lg:hidden">
                        {#each ['1 day', '2 weeks', '1 month', '6 months', '1 year'] as timeScale}
                            <button class:pointer-events-none={currentTimeScale === timeScale} on:click={() => { currentTimeScale = timeScale }}>
                                <p 
                                    class="text-darkgray font-poppins translate-y-[1px] font-medium text-[16px] rounded-full transition-all duration-150 ease-in-out px-4 py-[5px]"
                                    class:bg-neutral-100={currentTimeScale === timeScale}
                                >
                                    {timeScale}
                                </p>
                            </button>
                        {/each}
                    </div>

                </div>

                <div class="w-full flex-grow bg-white rounded-[20px] flex">

                    <div class="h-full w-[180px]  flex flex-col p-3">
                        <div class="w-full h-full bg-purple-600">

                        </div>
                    </div>

                    <div class="h-full flex-grow p-3 ">
                        <div class="w-full h-full relative overflow-hidden">
                            <canvas bind:this={insightsGraph} class="absolute top-0 left-0 w-full h-full"></canvas>
                        </div>
                    </div>

                </div>
            </div>

            <div class="w-full h-[42%] mt-6 flex">

                {#if ($page.data.session?.user?.membershipLevel) === 'standard'}
                <div class="h-full w-[500px] -xl:w-full bg-gray1 rounded-[20px] xl:mr-6 relative">

                    <div class="w-full h-full absolute z-20 flex flex-col">
                        <div class="w-full h-[90px] flex justify-center items-center ">
                            <p class=" text-[22px] font-poppins font-medium text-darkgray">Lectionary Time Used</p>
                        </div>
                        <div class="w-full h-[90px]"></div>
                        <div class="w-full flex-grow flex justify-center items-center">
                            <p class="text-primary font-normal font-semibold text-[45px]">{lectionMinsRatio}%</p>
                        </div>
                            <p class="text-gray2 font-poppins font-medium text-center my-2 text-[20px]">
                                <a href="/home/upgrade">
                                    Remove Limit?
                                </a>
                            </p>
                    </div>

                    <div class="w-full h-full absolute p-14">
                        <canvas bind:this={timeMeterCanvas} class=" w-full h-full absolute z-10"></canvas>
                        <canvas bind:this={timeMeterCanvasBackground} class=" w-full h-full absolute z-0"></canvas>
                    </div>

                </div>
                {:else}
                <div class="h-full w-[500px] -xl:w-full bg-gray1 rounded-[20px] xl:mr-6 relative">

                    <div class="w-full h-full absolute z-20 flex flex-col">
                        <div class="w-full h-[90px] flex justify-center items-center ">
                            <p class=" text-[22px] font-poppins font-medium text-darkgray">Lectionary Time Used</p>
                        </div>
                        <div class="w-full h-[90px]"></div>
                        <div class="w-full flex-grow flex justify-center items-center">
                            <p class="text-primary font-normal font-semibold text-[35px]">Unlocked</p>
                        </div>
                            <p class="text-gray2 font-poppins font-medium text-center my-2 text-[20px]">
                                Thank you supporting Lection
                            </p>
                    </div>

                    <div class="w-full h-full absolute p-14">
                        <canvas bind:this={timeMeterCanvas} class=" w-full h-full absolute z-10"></canvas>
                        <canvas bind:this={timeMeterCanvasBackground} class=" w-full h-full absolute z-0"></canvas>
                    </div>

                </div>
                {/if}

                <div class="h-full flex-grow -xl:hidden">

                    <div class="w-full h-1/3  pb-2">
                        <div class="w-full h-full rounded-[20px] bg-secondary flex justify-between px-5 py-2 items-center">

                            <p class=" text-white font-normal font-semibold text-[28px] w-4">
                                Lectionaries Started
                            </p>

                            <div class="h-full w-[50%] flex justify-end items-end">
                                <p class=" text-white font-normal font-semibold text-[35px]">
                                    {$page.data.session?.user?.stats.lectionariesStarted.toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div class="w-full h-1/3  pt-2 pb-2">
                        <div class="w-full h-full rounded-[20px] bg-accent flex justify-between px-5 py-2 items-center">

                            <p class=" text-white font-normal font-semibold text-[28px] w-4">
                                Students Taught
                            </p>

                            <div class="h-full w-[50%] flex justify-end items-end">
                                <p class=" text-white font-normal font-semibold text-[35px]">
                                    {$page.data.session?.user?.stats.studentsTaught.toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div class="w-full h-1/3 pt-2">
                        <div class="w-full h-full rounded-[20px] bg-primary flex justify-between px-5 py-2 items-center">

                            <p class=" text-white font-normal font-semibold text-[28px] w-4">
                                Prompts Submitted
                            </p>

                            <div class="h-full w-[50%] flex justify-end items-end">
                                <p class=" text-white font-normal font-semibold text-[35px]">
                                    {$page.data.session?.user?.stats.promptsSubmitted.toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>