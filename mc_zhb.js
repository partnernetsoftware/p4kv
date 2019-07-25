
module.exports = function(init_opts){
	var net = require("net");
	var {
		mc_host = "0.0.0.0",
		mc_port = 11111, 
	} = init_opts || {};


	var mc_save = async(k,v)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			var v_s = ""+v;
			var v_len = v_s.length;
			client.on("data",(data) => (console.log(`set ${k}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`set ${k} 0 0 ${v_len}\r\n${v_s}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	var mc_load = async(k)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			client.on("data",(data) => (console.log(`get ${k}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`get ${k}\r\n`));
			setTimeout(() => reject('TIMEOUT load'),6666);
		});
	}

	var mc_add = async(k,v,exptime=0,flags=0)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			var v_s = ""+v;
			var v_len = v_s.length;
			client.on("data",(data) => (console.log(`add ${k}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`add ${k} ${flags} ${exptime} ${v_len}\r\n${v_s}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	var mc_append = async(k,v)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			var v_s = ""+v;
			var v_len = v_s.length;
			client.on("data",(data) => (console.log(`append ${k}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`append ${k} 0 0 ${v_len}\r\n${v_s}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	var mc_cas = async(k,v,c,exptime=0,flags=0)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			var v_s = ""+v;
			var v_len = v_s.length;
			client.on("data",(data) => (console.log(`cas ${k}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`cas ${k} ${flags} ${exptime} ${v_len} ${c}\r\n${v_s}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	var mc_decr = async(k,v=1)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			var v_s = ""+v;
			var v_len = v_s.length;
			client.on("data",(data) => (console.log(`decr ${k}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`decr ${k} ${v_s}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	var mc_del = async(k)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			client.on("data",(data) => (console.log(`delete ${k}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`delete ${k}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	var mc_flush_all = async(exptime=0)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			client.on("data",(data) => (console.log(`flush_all ${exptime}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`flush_all ${exptime}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	var mc_incr = async(k,v=1)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			var v_s = ""+v;
			var v_len = v_s.length;
			client.on("data",(data) => (console.log(`incr ${k}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`incr ${k} ${v_s}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	var mc_prepend = async(k,v)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			var v_s = ""+v;
			var v_len = v_s.length;
			client.on("data",(data) => (console.log(`prepend ${k}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`prepend ${k} 0 0 ${v_len}\r\n${v_s}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	var mc_query = async(query)=>{
		return new Promise((resolve,reject)=>{
			var client = new net.Socket();
			query = query instanceof Array?query.join("\r\n"):query;
			client.on("data",(data) => (console.log(`${query}`),resolve(data.toString()),client.destroy()));
			client.connect(mc_port,mc_host,() => client.write(`${query}\r\n`));
			setTimeout(() => reject('TIMEOUT save'),6666);
		});
	}

	return {
		mc_save,
		mc_load,
		mc_add,
		mc_append,
		mc_cas,
		mc_decr,
		mc_del,
		mc_flush_all,
		mc_incr,
		mc_prepend,
		mc_query,
	};
}