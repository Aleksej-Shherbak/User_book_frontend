<template>
    <div id="app">
        <nav class="navbar navbar-dark bg-dark">
            <router-link class="navbar-brand" :to="{name: 'home'}">
                Users
            </router-link>
        </nav>
        <router-view/>
    </div>
</template>