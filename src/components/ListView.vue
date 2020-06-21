<template>
    <material-collection>
        <swipe-list
            ref="list"
            :items="rows"
            item-key="id"
            :disabled="disabled"
        >
            <template v-slot="{ item, index,revealRight, close }" >
                <li class="card-content collection-item avatar selectable" >
                    <span class="title left" v-if="showCategory">{{item.category.description}}</span>
                    <p class="left" style="clear: both"><b v-if="showDate">{{item.date|dateFormat}}</b> {{item.description}}</p>
                    <a href="#!" class="secondary-content" :class="classItem[index]">{{item.amount|numberFormat}}</a>
                </li>
            </template>
            <template v-slot:right="{ item,index }">
                <div class="swipeout-action light-blue" @click.prevent="onEdit(index)">
                    <i class="material-icons" style="color: white;">edit</i>
                </div>
                <!--<div class="swipeout-action red">
                    <i class="material-icons">delete_forever</i>
                </div>-->
            </template>
        </swipe-list>
        <!-- <li class="collection-item avatar selectable" v-for="(row,index) in rows" :key="index">
                   <span class="title left">{{row.categories.description}}</span>
                   <p class="left" style="clear: both"><b>{{row.date|dateFormat}}</b> {{row.description}}</p>
                   <a href="#!" class="secondary-content" :class="classItem[index]">{{row.amount|numberFormat}}</a>
            </li>-->
    </material-collection>
</template>

<script>
    import MaterialCollection from "./MaterialCollection";
    import { SwipeList, SwipeOut } from 'vue-swipe-actions';
    export default {
        name: "ListView",
        components: {
            MaterialCollection,
            SwipeList,
            SwipeOut,
        },
        props:{
            rows:{
                type:Array,
                default:()=>[]
            },
            disabled:{
                type:Boolean,
                default:false
            },
            showCategory:{
                type:Boolean,
                default:true
            },
            showDate:{
                type:Boolean,
                default:true
            }
        },
        computed:{
            classItem(){
                return this.rows.map((item)=>{
                    let amount=Number(item.amount)
                    let className='green-text';
                    if(amount<0){
                        className='red-text'
                    }
                    return className;
                })
            }
        },
        methods:{
            onEdit(index){
                this.$emit('edit',index);
                this.$refs.list.closeActions(index);
            }
        }
    }
</script>

<style scoped>

</style>