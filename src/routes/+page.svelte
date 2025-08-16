<script lang="ts">
	import { onMount } from 'svelte';
	
	let name1 = $state('');
	let name2 = $state('');
	let result = $state<{ percentage: number; message: string } | null>(null);
	let isCalculating = $state(false);
	let showResult = $state(false);
	
	// Love calculation algorithm - consistent results for same names
	function calculateLove(name1: string, name2: string): number {
		if (!name1.trim() || !name2.trim()) return 0;
		
		// Convert names to lowercase and remove spaces
		const cleanName1 = name1.toLowerCase().replace(/\s/g, '');
		const cleanName2 = name2.toLowerCase().replace(/\s/g, '');
		
		// Calculate ASCII sum for both names
		let sum1 = 0;
		let sum2 = 0;
		
		for (let i = 0; i < cleanName1.length; i++) {
			sum1 += cleanName1.charCodeAt(i);
		}
		
		for (let i = 0; i < cleanName2.length; i++) {
			sum2 += cleanName2.charCodeAt(i);
		}
		
		// Combine sums and create consistent percentage
		const combined = sum1 + sum2;
		const percentage = (combined * 7 + cleanName1.length * cleanName2.length * 3) % 101;
		
		return Math.max(1, percentage); // Ensure at least 1%
	}
	
	function getLoveMessage(percentage: number): string {
		if (percentage >= 80) return "A match made in heaven ❤️🔥";
		if (percentage >= 60) return "Strong bond, lots of potential 💕";
		if (percentage >= 40) return "There's a spark, but needs effort ✨";
		if (percentage >= 20) return "Better as friends maybe 😅";
		return "Oops… maybe not meant to be 💔";
	}
	
	async function handleCalculate(): Promise<void> {
		if (!name1.trim() || !name2.trim()) {
			alert('Please enter both names!');
			return;
		}
		
		isCalculating = true;
		showResult = false;
		
		// Add delay for dramatic effect
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		const percentage = calculateLove(name1, name2);
		const message = getLoveMessage(percentage);
		
		result = { percentage, message };
		isCalculating = false;
		showResult = true;
	}
	
	function shareResult(): void {
		if (!result) return;
		
		const text = `${name1} + ${name2} = ${result.percentage}% love compatibility! ${result.message}`;
		const url = window.location.href;
		
		if (navigator.share) {
			navigator.share({
				title: 'Love Calculator Result',
				text: text,
				url: url
			});
		} else {
			navigator.clipboard.writeText(`${text} - Try it yourself: ${url}`);
			alert('Result copied to clipboard!');
		}
	}
	
	function reset(): void {
		name1 = '';
		name2 = '';
		result = null;
		showResult = false;
		isCalculating = false;
	}
</script>

<!-- <svelte:head>
	<title>Love Calculator – Check Your Name Compatibility Online</title>
</svelte:head> -->

<div class="min-h-screen bg-transparent">
	<!-- Ad Space Top -->
	<div class="w-full h-20 bg-gray-100 border-b flex items-center justify-center text-gray-500 text-sm">
		<div id="adsterra-top-banner">
			<script async data-cfasync="false" src="//pl27434935.profitableratecpm.com/b69b2703918ded0a66b9da0f5f05a76b/invoke.js"></script>
			<div id="container-b69b2703918ded0a66b9da0f5f05a76b"></div>
		</div>
	</div>
	
	<div class="container mx-auto px-4 py-12 max-w-3xl">
		<h1 class="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">Love Compatibility Calculator</h1>
		
		<div class="glass-morphism p-8 rounded-2xl backdrop-blur-lg border border-white/20 shadow-xl mb-8">
			<p class="text-lg mb-6 dark:text-white/90">
				Discover your love compatibility score with our fun and accurate love calculator. 
				Enter two names below to see how well they match based on our unique algorithm.
			</p>
			
			<div class="space-y-6">
				<div>
					<label for="name1" class="block text-sm font-medium dark:text-white/80 mb-2">Your Name</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 dark:text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<input 
							type="text" 
							id="name1" 
							bind:value={name1}
							class="glass-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-200"
							placeholder="Enter your name"
							autocomplete="off"
						/>
					</div>
				</div>
				
				<div class="flex justify-center">
					<div class="w-12 h-12 rounded-full bg-pink-500/50 border-2 border-white/20 flex items-center justify-center text-white/80">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
						</svg>
					</div>
				</div>
				
				<div>
					<label for="name2" class="block text-sm font-medium text-white/80 mb-2">Partner's Name</label>
					<div class="relative">
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
							</svg>
						</div>
						<input 
							type="text" 
							id="name2" 
							bind:value={name2}
							class="glass-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all duration-200"
							placeholder="Enter partner's name"
							autocomplete="off"
						/>
					</div>
				</div>
				
				<div class="pt-2">
					<button 
						onclick={handleCalculate}
						disabled={!name1 || !name2 || isCalculating}
						class="w-full glass-button-hover px-6 py-3.5 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center gap-2"
					>
						{#if isCalculating}
							<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<span>Calculating...</span>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
							</svg>
							<span>Calculate Love</span>
						{/if}
					</button>
				</div>
			</div>
		</div>
		
		<!-- Result Display -->
		{#if showResult && result}
			<div class="glass-morphism p-8 rounded-2xl backdrop-blur-lg border border-white/20 shadow-xl mb-8 transform transition-all duration-500 ease-in-out">
				<div class="text-center">
					<div class="mb-6">
						<div class="text-7xl dark:text-white/90 font-bold mb-2 drop-shadow-lg" style="color: #ff2f59;">{result.percentage}%</div>
						<div class="text-xl dark:text-white/90 mb-6 font-medium">{result.message}</div>
						
						<!-- Animated Progress Ring -->
						<div class="relative w-48 h-48 mx-auto mb-8">
							<svg class="w-full h-full" viewBox="0 0 100 100">
								<circle 
									cx="50" 
									cy="50" 
									r="45" 
									fill="none" 
									stroke="rgb(139 139 139)" 
									stroke-width="10"
									stroke-linecap="round"
									class="transform -rotate-90 origin-center"
								/>
								<circle 
									cx="50" 
									cy="50" 
									r="45" 
									fill="none" 
									stroke="url(#gradient)" 
									stroke-width="10"
									stroke-linecap="round"
									stroke-dasharray="283"
									stroke-dashoffset={283 - (283 * result.percentage / 100)}
									class="transform -rotate-90 origin-center transition-all duration-1000 ease-out"
								/>
								<defs>
									<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
										<stop offset="0%" stop-color="#ec4899" />
										<stop offset="100%" stop-color="#f43f5e" />
									</linearGradient>
								</defs>
							</svg>
						</div>
					</div>
					
					<!-- Action Buttons -->
					<div class="flex gap-4 justify-center">
						<button
							onclick={shareResult}
							class="glass-button px-6 py-2.5 rounded-lg font-medium text-white hover:bg-white/20 transition-all flex items-center gap-2"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
							</svg>
							Share
						</button>
						<button
							onclick={reset}
							class="glass-button px-6 py-2.5 rounded-lg font-medium text-white hover:bg-white/20 transition-all flex items-center gap-2"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							Try Again
						</button>
					</div>
				</div>
			</div>
		{/if}
		
		<!-- How it Works -->
		<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
			<h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-white">How it Works</h2>
			<p class="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
				Our love calculator uses a special algorithm based on the letters in your names to calculate compatibility. 
				The same names will always give the same result, making it fun and consistent!
			</p>
		</div>
		
		<!-- Social Share -->
		<div class="text-center">
			<p class="text-gray-600 text-sm mb-4 dark:text-gray-300">Share with friends:</p>
			<div class="flex justify-center gap-4">
				<button
					onclick={() => window.open(`https://wa.me/?text=Check your love compatibility at ${window.location.href}`, '_blank')}
					class="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
				>
					📱
				</button>
				<button
					onclick={() => window.open(`https://twitter.com/intent/tweet?text=Just tried this fun love calculator!&url=${window.location.href}`, '_blank')}
					class="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
				>
					🐦
				</button>
				<button
					onclick={() => navigator.clipboard.writeText(window.location.href)}
					class="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
				>
					🔗
				</button>
			</div>
		</div>
	</div>
	
	<!-- Ad Space Bottom -->
	<div class="w-full h-20 bg-gray-100 border-t flex items-center justify-center text-gray-500 text-sm mt-8">
		<div id="adsterra-bottom-banner">
			<script async data-cfasync="false" src="//pl27434935.profitableratecpm.com/b69b2703918ded0a66b9da0f5f05a76b/invoke.js"></script>
			<div id="container-b69b2703918ded0a66b9da0f5f05a76b"></div>
		</div>
	</div>
</div>

<style>
	/* Romantic Light Theme */
	:global(body) {
		background: linear-gradient(-45deg, #fd7e82, #ffc0af, #ffb7ea, #9bbfff);
		background-size: 400% 400%;
		animation: gradient 15s ease infinite;
		color: #4a4a4acb;
	}

	@keyframes gradient {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}

	/* Glass Morphism Effect */
	.glass-morphism {
		background: rgba(255, 255, 255, 0.445);
		box-shadow: 0 8px 32px 0 rgba(255, 132, 150, 0.788);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.733);
	}

	.glass-button {
		background: rgba(255, 255, 255, 0.445);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border: 1px solid rgba(255, 255, 255, 0.8);
		transition: all 0.3s ease;
		color: #ff2f59;
	}

	.glass-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(255, 107, 136, 0.2);
	}

	.glass-button-hover {
		background: linear-gradient(45deg, #ff2f59, #ff8e9e);
		color: white;
		border: none;
		transition: all 0.3s ease;
	}

	.glass-button-hover:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(255, 107, 136, 0.4);
	}

	.glass-input {
		background: rgba(255, 255, 255, 0.8) !important;
		border: 1px solid rgba(255, 182, 193, 0.5) !important;
		color: #4a4a4a !important;
		transition: all 0.3s ease;
	}

	.glass-input:focus {
		border-color: #ff2f59 !important;
		box-shadow: 0 0 0 2px rgba(255, 107, 136, 0.2);
	}

	.glass-input::placeholder {
		color: #c4c4c4 !important;
	}

	/* Text colors */
	h1, h2, h3, h4, h5, h6 {
		color: #5d3a3a;
	}

	label {
		color: #5d3a3a !important;
	}

	/* Update form section */
	.container {
		padding: 2rem 1rem;
	}

	/* Update ad spaces */
	.bg-gray-100 {
		background-color: rgba(255, 255, 255, 0.7) !important;
		border-color: rgba(255, 182, 193, 0.3) !important;
	}

	/* Update social share buttons */
	.bg-green-500 { background-color: #48bb78 !important; }
	.bg-blue-400 { background-color: #63b3ed !important; }
	.bg-gray-500 { background-color: #a0aec0 !important; }

	/* Update the progress ring */
	text {
		fill: #5d3a3a;
	}

	/* Update the heart icon color */
	svg.text-pink-500 {
		color: #ff2f59 !important;
	}

	/* Add subtle animation to the plus icon */
	@keyframes pulse {
		0% { transform: scale(1); }
		50% { transform: scale(1.1); }
		100% { transform: scale(1); }
	}

	.flex.justify-center svg {
		animation: pulse 2s infinite;
	}
</style>
